import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '../../assets/icons';
import { tailwind } from '../../extra/tailwind';

const index = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { statusName } = state.historyReducer;
    // const dummyHistory = [{
    //     name: 'H-1 Acara',
    //     schedule: 'Jangan lupa besok hari acara anda dengan JBI Tania Alexandra'
    // },
    // {
    //     name: 'Pembatalan Jadwal',
    //     schedule: 'Pengajuan pembatalan anda diterima, jadwal 240720210018 telah '
    // },
    // {
    //     name: 'Pengajuan perubahan jadwal',
    //     schedule: 'Tania Alexandra mengajukan perubahan jadwal untuk tanggal 07..'
    // },
    // {
    //     name: 'Order JBI',
    //     schedule: 'Anda berhasil membuat jadwal dengan seorang JBI.'
    // },
    // {
    //     name: 'Pengajuan Pembatalan',
    //     schedule: 'Edward Riyadi membatalkan jadwal dengan anda'
    // },
    // {
    //     name: 'Pengajuan Pembatalan',
    //     schedule: 'Edward Riyadi membatalkan jadwal dengan anda'
    // },
    // {
    //     name: 'Pengajuan Pembatalan',
    //     schedule: 'Edward Riyadi membatalkan jadwal dengan anda'
    // }];

    const changeStatus = (statusName) => {
        dispatch({ type: 'SET_STATUS', value: { statusName: statusName } });
    }

    const [modalVisible, setModalVisible] = useState(false)
    const toggleModal = () => setModalVisible(!modalVisible);
    const goBack = () => navigation.goBack();
    useEffect(() => {

        return () => {

        }
    }, []);
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center justify-between')}>
                    <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{t('notification')}</Text>
                    <TouchableOpacity onPress={goBack}>
                        <CloseIcon></CloseIcon>
                    </TouchableOpacity>
                </View>
                <View style={tailwind('p-4')}>
                    {/* <ScrollView style={{ height: '90%' }}>
                        {
                            dummyHistory.map((dm, i) => {
                                return (<View key={i}>
                                    <View style={tailwind('flex-row mb-1')}>
                                        <View style={tailwind('mr-1')}>
                                            <ClockIcon></ClockIcon>
                                        </View>
                                        <Text style={tailwind(`font-poppins-400 text-gray-500 text-xs opacity-60`)}>{'24-07-2021  15.48'}</Text>
                                    </View>
                                    <TouchableOpacity style={tailwind('shadow-card pl-4 py-5 mb-3 bg-white rounded-2xl')}>
                                        <View style={tailwind('flex-row justify-between')}>
                                            <View style={tailwind('w-full flex-row items-center')}>
                                                <View >
                                                    <UserAvatar name="Finenna" size={50} />
                                                </View>
                                                <View style={tailwind('px-3 w-full')}>
                                                    <Text style={tailwind(`font-poppins-400 text-sm`)}>
                                                        {dm.name}
                                                    </Text>
                                                    <View>
                                                        <Text numberOfLines={2} style={tailwind(`font-poppins-400 text-gray-500 text-xs opacity-60`)}>
                                                            {dm.schedule}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>)
                            })
                        }
                    </ScrollView>
               */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default index
