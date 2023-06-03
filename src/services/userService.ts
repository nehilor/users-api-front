import axios from 'axios';

const API_URL = 'http://localhost:8000/users'; // Update the URL with your backend server URL

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error);
    }
};

export const getUserById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error);
    }
};

export const createUser = async (user: any) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error);
    }
};

export const updateUser = async (id: string, user: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error);
    }
};

export const deleteUser = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
        throw new Error(error.response.data.error);
    }
};
