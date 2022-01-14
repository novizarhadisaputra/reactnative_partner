import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DetailIcon, NotificationIcon } from '../../assets/icons';
import { clockPhoto, pinnedPhoto } from '../../assets/images';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { getDataPartner, getHistoryFiveIndex } from '../../services';

const index = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { now, sex, province } = state.homeReducer;
    const [mounted, setmounted] = useState(true);
    const [history, sethistory] = useState([]);
    const { language } = state.globalReducer;
    const { user } = state.profileReducer;
    const borderNonActive = tailwind(`border ${language == 'en' ? 'w-40 mr-2' : ''} flex-row items-center color-border-gray px-4 py-2 rounded-2xl`);

    const gotoSchedule = () => navigation.navigate('Search');
    const gotoNotification = () => navigation.navigate('Notification');
    const gotoSetSchedule = () => navigation.navigate('SetSchedule');

    useEffect(() => {
        async function clearReduxLogin() {
            dispatch({ type: 'SET_HAS_SUBMIT', value: { hasSubmit: false } });
        }

        messaging()
            .getToken()
            .then(token => {
                console.log(`token`, token)
            });

        async function loadTransaction() {
            const response = await getHistoryFiveIndex();
            if (response.transactions) {
                let data = response.transactions;
                if (t('statusName') == 'Finish') {
                    data = response.transactions.map(v => v.status.name == 'Finish');
                } else if (t('statusName') == 'Cancel') {
                    data = response.transactions.map(v => v.status.name == 'Canceled');
                } else if (t('statusName') == 'Ongoing') {
                    data = response.transactions.map(v => v.status.name == 'Ongoing');
                } else if (t('statusName') == 'Paid') {
                    data = response.transactions.map(v => v.status.name == 'Paid');
                }
                sethistory(data)
            }
            setmounted(false)
        }

        loadTransaction();

        if (mounted) {
            clearReduxLogin();
        }
        return () => {
            messaging().onTokenRefresh(token => {
                console.log(`refresh token`, token)
            });
            setmounted(false);
        }
    }, [])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView>
                <View style={tailwind('w-full h-full bg-gray-100')}>
                    <View style={tailwind('flex-row p-4 items-center justify-between')}>
                        <View>
                            <Text style={tailwind(`font-poppins-600 text-sm text-red-600`)}>{'Halo'}</Text>
                            <Text style={tailwind(`font-poppins-400 text-sm text-black`)}>{user.name}</Text>
                        </View>
                        <TouchableOpacity style={tailwind('bg-white p-2 rounded')} onPress={gotoNotification}>
                            <NotificationIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={tailwind('flex-row px-4 mb-4')}>
                        <View style={tailwind('w-3/4')}>
                            <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{t('haveRegisteredAs')} <Text style={tailwind(`font-poppins-600 text-xl text-red-600`)}>{'JBI'}</Text></Text>

                        </View>
                    </View>
                    <View style={tailwind('px-4 w-full')}>
                        <View style={tailwind('bg-white shadow-card flex-row items-center justify-between h-40 bg-red-600 px-6 py-4 rounded-xl')}>
                            <Text style={tailwind('w-3/4 text-sm font-poppins-400 text-white')}>{t('welcomePartner')}</Text>
                            <TouchableOpacity>
                                <DetailIcon></DetailIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-8'}></Gap>

                        <View style={tailwind('flex-row items-center justify-between')}>
                            <Text style={tailwind(`font-poppins-600 text-base`)}>
                                {t('setAvailability')}
                            </Text>
                        </View>
                        <Gap size={'h-4'}></Gap>
                        <View style={tailwind(`flex-row w-10/12`)}>
                            <TouchableOpacity onPress={gotoSetSchedule} style={borderNonActive}>
                                <Image source={pinnedPhoto} width={10} height={10} />
                                <Text style={tailwind(`text-center ml-2 text-black font-poppins-400 opacity-60`)}>{t('setSchedule')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={gotoSchedule} style={borderNonActive}>
                                <Image source={clockPhoto} width={10} height={10} />
                                <Text style={tailwind(`text-center ml-2 text-black font-poppins-400 opacity-60`)}>{t('practiceHours')}</Text>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-4'}></Gap>
                        <View style={tailwind('flex-row items-center justify-between')}>
                            <Text style={tailwind(`font-poppins-600 text-base`)}>
                                {t('eventDate')}
                            </Text>
                            <TouchableOpacity onPress={gotoSchedule}>
                                <Text style={tailwind('text-red-600')}>{t('seeMore')}</Text>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-4'}></Gap>
                        <ScrollView style={tailwind('h-5/6')}>
                            {
                                mounted ? <Text style={tailwind('font-poppins-400 text-lg')}>{'Loading......'}</Text> :
                                    history.map((dm, i) => {
                                        return (
                                            <TouchableOpacity onPress={() => navigation.navigate('HistoryDetail', { screen: 'HistoryDetail', params: { transaction: dm } })} key={i} style={tailwind(`flex-row border ${dm.details[0].schedule.date == moment(new Date(now)).format("YYYY-MM-D") ? 'border-green-500' : 'color-border-gray'}  mb-2 flex-row justify-between rounded-md w-full h-14 items-center p-4`)}>
                                                <View>
                                                    <Text style={tailwind(`font-poppins-400 text-xs`)}>
                                                        {moment(new Date(dm.details[0].schedule.date)).format("DD MMMM YYYY")}
                                                    </Text>
                                                    <Text style={tailwind(`font-poppins-400 text-gray-500 text-xs`)}>
                                                        {t('available')} {dm.details[0].schedule.time_start} - {dm.details[0].schedule.time_end}
                                                    </Text>
                                                </View>

                                                <Text style={tailwind('font-poppins-300 text-xs color-green-custom')}>{dm.details[0].schedule.is_available ? 'Tersedia' : 'Tidak Tersedia'}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                            }
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})
