import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon } from '../../assets/icons';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { uploadAvatar } from '../../services';

const changeAvatar = ({ navigation }) => {
    const state = useSelector(state => state);
    const { t, i18n } = useTranslation();

    const goBack = () => {
        navigation.goBack()
    };

    const createFormData = (photo) => {
        console.log(`photo`, photo)
        const data = new FormData();
        data.append('photo_profile', {
            name: photo.fileName,
            type: photo.type,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
      
        return data;
    };

    const getImage = async (type) => {
        if (type == 'camera') {
            launchCamera({ noData: true }, async (response) => {
                // console.log(response);
                if (response?.assets[0].uri) {
                    const photo = response?.assets[0];
                    const data = createFormData(photo);
                    const res = await uploadAvatar(data);
                    navigation.navigate('Profile')
                }
            });

        } else {
            launchImageLibrary({ noData: true }, async (response) => {
                // console.log(response);
                if (response) {
                    const data = createFormData(response);
                    const res = await uploadAvatar(data);
                    navigation.goBack()
                }
            });
        }

    };

    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center')}>
                    <TouchableOpacity onPress={goBack}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>
                    <Text style={tailwind(`font-poppins-600 pl-4 text-xl mr-3 text-black`)}>{t('editPhoto')}</Text>
                </View>
                <Gap size={'h-8'} />
                <View style={tailwind('justify-center items-center px-4')}>
                    <TouchableOpacity onPress={() => getImage('gallery')} style={tailwind('flex-row mb-3 w-full justify-center items-center border border-red-600 bg-red-400 h-14 rounded-lg')}>
                        <Text style={tailwind('text-base font-poppins-600 text-white')}>{'Gallery'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getImage('camera')} style={tailwind('flex-row w-full justify-center items-center border border-red-600 bg-red-400 h-14 rounded-lg')}>
                        <Text style={tailwind('text-base font-poppins-600 text-white')}>{'Camera'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default changeAvatar

const styles = StyleSheet.create({})
