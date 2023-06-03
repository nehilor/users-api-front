import axios from 'axios';

const API_URL = 'http://localhost:8000/auth'; // Update the URL with your backend server URL

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.error)
    }
};

export const logout = async () => {
    // Implement your logout logic here
};
