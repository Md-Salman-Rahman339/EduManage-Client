import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timeout');
          return Promise.reject({ 
            message: 'Request timeout. Please try again.' 
          });
        }

        if (error.response) {
          const { status, data } = error.response;
          
          if (status === 400) {
            console.error('Validation Error:', data.message || 'Invalid request');
            return Promise.reject(data);
          }

          if (status === 401 || status === 403) {
            console.error('Auth Error - Redirecting to login');
            localStorage.removeItem('access-token');
            navigate('/login', { 
              state: { from: window.location.pathname },
              replace: true 
            });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;