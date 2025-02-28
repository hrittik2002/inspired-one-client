import axios from "axios";

const API_URL = "http://localhost:3000/api"; 

// Configure axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // Important for CORS

const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.data.token) {
      saveToken(response.data.token);
    }
    return response;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.data.token) {
      saveToken(response.data.token);
    }
    return response;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

export const getUserProfile = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  return axios.get(`${API_URL}/user/profile`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
