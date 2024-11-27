import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const signUp = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const signIn = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signin`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const signOut = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/signout`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 