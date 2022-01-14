import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../config";

export const logout = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${baseUrl}/api/auth/logout`, {}, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data).catch(e => console.log(e));
    await AsyncStorage.setItem('userToken', '');
    return response;
}

export const login = async (data) => {
    const response = await axios.post(`${baseUrl}/api/auth/login/partner`, data).then(res => res.data.data).catch(e => console.log(e));
    return response;
}

export const loginThirdParty = async (data) => {
    const response = await axios.post(`${baseUrl}/api/auth/login/third-party`, data).then(res => res.data.data).catch(e => console.log(e));
    return response;
}

export const resetPassword = async (data) => {
    const response = await axios.post(`${baseUrl}/api/auth/reset-password`, data).then(res => res.data.data).catch(e => console.log(e));
    return response;
}

export const updatePassword = async (data) => {
    const response = await axios.put(`${baseUrl}/api/auth/update-password`, data)
        .then(res => res.data.data)
        .catch(e => console.log(e));
    return response;
}

export const checkSecurityCode = async (data) => {
    const response = await axios.post(`${baseUrl}/api/auth/check-security-code`, data)
        .then(res => res.data.data)
        .catch(e => console.log(e));
    return response;
}

export const registration = async (data) => {
    const response = await axios.post(`${baseUrl}/api/auth/registration`, data)
        .then(res => res.data.data)
        .catch(e => e);
    return response;
}