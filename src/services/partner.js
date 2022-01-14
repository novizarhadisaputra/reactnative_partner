import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../config";

export const getDataPartner = async (date = '', province = '', sex = '', search = '') => {
    const token = await AsyncStorage.getItem('userToken');
    let query = !date ? '?per_page=5' : `?per_page=5&date=${date}`;
    query = `${query}${!province ? '' : `&province=${province}`}`;
    query = `${query}${!sex ? '' : `&sex=${sex}`}`;
    query = `${query}${!search ? '' : `&search=${search}`}`;
    const response = await axios.get(`${baseUrl}/api/partner/list/active${query}`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }).then(res => res.data.data).catch(e => console.log(e));
    return response;
}

export const updateFieldPartner = async (data, id) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.put(`${baseUrl}/api/partner/${id}`, data, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data.data).catch(e => console.log(e));
    return response;
}