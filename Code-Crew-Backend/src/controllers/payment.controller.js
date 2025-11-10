import dotenv from 'dotenv';
dotenv.config();

import Razorpay from 'razorpay';
import paymentModel from '../models/payment.model.js';
import CrewApplication from '../models/crew.model.js';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order for a fixed amount: ₹19 (1900 paise)
export const createOrder = async (req, res) => {
  try {
    const amountInPaise = 19 * 100; // Razorpay expects amount in smallest currency unit (1900 paise = ₹19)

    console.log('Creating Razorpay order with amount:', amountInPaise, 'paise (₹19)');
    console.log('Using Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
    };

    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order);

    // store payment record linked to the authenticated user
    const newPayment = await paymentModel.create({
      user: req.user.id,
      orderId: order.id,
      amount: 19,
      currency: 'INR',
      status: 'pending',
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error('createOrder error:', error);
    return res.status(500).json({ error: 'Error creating order', details: error.message });
  }
};

// Verify Razorpay payment signature and mark payment as completed, approve crew application
export const verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  console.log('Verify payment request:', { razorpayOrderId, razorpayPaymentId, signature });

  try {
    // Validate that all required fields are present
    if (!razorpayOrderId || !razorpayPaymentId || !signature) {
      return res.status(400).json({ error: 'Missing required payment parameters' });
    }

    const result = validatePaymentVerification({ 
      order_id: razorpayOrderId, 
      payment_id: razorpayPaymentId 
    }, signature, secret);

    if (!result) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
    if (!payment) {
      console.error('Payment record not found for orderId', razorpayOrderId);
      return res.status(404).json({ error: 'Payment record not found' });
    }

    payment.paymentId = razorpayPaymentId;
    payment.signature = signature;
    payment.status = 'completed';
    await payment.save();

    // Update the related crew application for this user to 'approved'
    const application = await CrewApplication.findOne({ user: payment.user });
    if (application) {
      application.status = 'approved';
      await application.save();
    } else {
      console.warn('No crew application found for user', payment.user);
    }

    return res.json({ status: 'success' });
  } catch (error) {
    console.error('verifyPayment error:', error);
    return res.status(500).json({ error: 'Error verifying payment', details: error.message });
  }
};