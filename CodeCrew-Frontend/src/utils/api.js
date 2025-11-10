const API_BASE = "https://codecrew-exiy.onrender.com/api/v1";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Users
export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/admin/users`, { 
    credentials: "include",
    headers: getAuthHeaders()
  });
  return await res.json();
}
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/admin/users/${id}`, { 
    method: "DELETE", 
    credentials: "include",
    headers: getAuthHeaders()
  });
  return await res.json();
}
export async function getUserById(id) {
  const res = await fetch(`${API_BASE}/user/${id}`, { 
    credentials: "include",
    headers: getAuthHeaders()
  });
  return await res.json();
}

// Hackathons
export async function getHackathons() {
  const res = await fetch(`${API_BASE}/hackathons`, { 
    credentials: "include",
    headers: getAuthHeaders()
  });
  return await res.json();
}
export async function addHackathon(formData) {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}/hackathons`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers
  });
  return await res.json();
}
export async function updateHackathon(id, formData) {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}/hackathons/${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
    headers
  });
  return await res.json();
}
export async function deleteHackathon(id) {
  const res = await fetch(`${API_BASE}/hackathons/${id}`, { 
    method: "DELETE", 
    credentials: "include",
    headers: getAuthHeaders()
  });
  return await res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.success && data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (data.success && data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export async function getMe() {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: getAuthHeaders()
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch {
    return { success: false, data: null };
  }
}

export async function applyToJoinCrew(
  mobileNumber,
  techStack,
  college,
  branch,
  cityState,
  linkedin,
  github,
  codingPlatform,
  message
) {
  const res = await fetch(`${API_BASE}/crew/apply`, {
    method: "POST",
    credentials: "include",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      mobileNumber,
      techStack,
      college,
      branch,
      cityState,
      linkedin,
      github,
      codingPlatform,
      message,
    }),
  });
  return res.json();
}

export async function getMyCrewApplication() {
  const res = await fetch(`${API_BASE}/crew/my`, {
    method: "GET",
    credentials: "include",
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function updateProfile(formData) {
  // formData: FormData object (for file upload)
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}/user/update`, {
    method: "PUT",
    credentials: "include",
    body: formData,
    headers
  });
  return res.json();
}

export async function updateCrewDetails(data) {
  // data: plain object
  const res = await fetch(`${API_BASE}/crew/update`, {
    method: "PUT",
    credentials: "include",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

// Add this for /user/me
export async function getUserAndCrew() {
  try {
    const res = await fetch(`${API_BASE}/user/me`, {
      method: "GET",
      credentials: "include",
      headers: getAuthHeaders()
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch {
    return { success: false, data: null };
  }
}

export function getGoogleAuthUrl() {
  return "https://codecrew-exiy.onrender.com/api/v1/auth/google";
}