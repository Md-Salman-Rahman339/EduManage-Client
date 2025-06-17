// import axios from "axios";
 
//  const axiosPublic = axios.create({
//     //  baseURL: 'http://localhost:5000',
//     baseURL:'http://127.0.0.1:8000',
//      withCredentials:true,
//  })
 
//  const useAxiosPublic = () => {
//      return axiosPublic;
//  };
 
//  export default useAxiosPublic;

import axios from "axios";
import { MdGeneratingTokens } from "react-icons/md";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${()}`
  }
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;