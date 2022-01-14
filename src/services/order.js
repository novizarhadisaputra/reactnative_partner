import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../config";

export const getHistoryOrder = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${baseUrl}/api/partner/list/transaction`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }).then(res => res.data.data).catch(e => console.log(e.response.data));
    return response;
}

export const getHistoryFiveIndex = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${baseUrl}/api/partner/list/transaction?per_page=5`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }).then(res => res.data.data).catch(e => console.log(e.response.data));
    return response;
}

export const storeOrder = async (data) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${baseUrl}/api/transaction`, data, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data.data).catch(e => console.log(e.response.data));
    return response;
}

export const cancelOrder = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${baseUrl}/api/partner/transaction/${id}/cancel`, {}, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data.data).catch(e => console.log(e.response.data));
    return response;
}

export const acceptOrder = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${baseUrl}/api/partner/transaction/${id}/accept`, {}, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data.data).catch(e => console.log(e.response.data));
    return response;
}

export const finishOrder = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${baseUrl}/api/partner/transaction/${id}/finish`, {}, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data.data).catch(e => console.log(e.response.data));
    return response;
}

