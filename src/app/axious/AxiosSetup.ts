import axios from "axios";
import { environment } from "../../../env";

// Check if localStorage is available
let token = '';
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token') || '';
  console.log(typeof window);
  
  console.log('localStorage token:', token); // Check if this logs the token correctly
}

// Create axios instance
export const custom_axios = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    Accept: '*/*',
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

console.log('axios instance:', custom_axios); // Check if this logs the axios instance for further debugging

