import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../config";

export const getDataTimeSchedule = async (id, date) => {
    const token = await AsyncStorage.getItem('userToken');
    let query = !date ? '' : `?date=${date}`;

    const response = await axios.get(`${baseUrl}/api/partner/${id}/schedules${query}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data.data).catch(e => console.log(e));
    return response;
}

export const storeDataTimeSchedule = async (data) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${baseUrl}/api/schedule`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.data.data).catch(e => console.log(e));
    return response;
}

// {{url}}/api/schedule