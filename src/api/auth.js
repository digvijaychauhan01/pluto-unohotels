import axios from 'axios';
import config from "../config";

const API_URL = config.API_HOST;

export const signUp = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const signIn = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signin`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const signOut = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/auth/signout`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 