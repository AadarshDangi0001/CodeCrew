import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: {
    type: String,
    default: null,
  },
  signature: {
    type: String,
    default: null,
  },
  // fixed single amount in rupees
  amount: {
    type: Number,
    required: true,
    default: 19,
    validate: {
      validator: function (v) {
        return v === 19;
      },
      message: (props) => `${props.value} is not allowed — only a payment of 19 INR is permitted`,
    },
    min: 19,
    max: 19,
  },
  currency: {
    type: String,
    required: true,
    default: "INR",
    enum: ["INR"]
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;