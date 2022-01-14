import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../config";

export const getDetailUser = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${baseUrl}/api/user/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data.data).catch(e => console.log(e));
    return response;
}