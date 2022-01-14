import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownTwoIcon, ClockIcon, CloseIcon, RadioButtonActiveIcon, RadioButtonIcon } from '../../assets/icons';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { getHistoryOrder } from '../../services';

const index = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { statusName } = state.historyReducer;
    const arrStatus = ['allStatus', 'finish', 'paid', 'ongoing', 'waitingPayment', 'cancel'];
    const [mounted, setmounted] = useState(true);
    const [history, sethistory] = useState([]);
    const gotoHome = () => navigation.navigate('Home');
    const changeStatus = async (statusName) => {
        setmounted(true)
        const response = await getHistoryOrder();
        if (response.transactions) {
            let data = response.transactions;
            if (t(statusName) == 'Finish' || t(statusName) == 'Selesai') {
                data = response.transactions.filter(v => v.status.name == 'Finish');
            } else if (t(statusName) == 'Cancel' || t(statusName) == 'Dibatalkan') {
                data = response.transactions.filter(v => v.status.name == 'Canceled');
            } else if (t(statusName) == 'Ongoing' || t(statusName) == 'Belum Terlaksana') {
                data = response.transactions.filter(v => v.status.name == 'Ongoing');
            } else if (t(statusName) == 'Paid' || t(statusName) == 'Terbayar') {
                data = response.transactions.filter(v => v.status.name == 'Paid');
            } else if (t(statusName) == 'Waiting Payment' || t(statusName) == 'Menunggu Pembayaran') {
                data = response.transactions.filter(v => v.status.name == 'Waiting Payment');
            }
            sethistory(data)
        }
        setmounted(false)
        dispatch({ type: 'SET_STATUS', value: { statusName: statusName } });
    }
    const [modalVisible, setModalVisible] = useState(false)
    const toggleModal = () => setModalVisible(!modalVisible);

    useEffect(() => {
        async function loadHistory() {
            const response = await getHistoryOrder();
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
                console.log(`data`, data)
                sethistory(data)
            }
            setmounted(false)
        }

        loadHistory();
        return () => {
        }
    }, []);
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center justify-between')}>
                    <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{t('history')}</Text>
                    <TouchableOpacity onPress={gotoHome}>
                        <CloseIcon></CloseIcon>
                    </TouchableOpacity>
                </View>
                <View style={tailwind('p-4')}>
                    <View style={tailwind('flex-row')}>
                        <TouchableOpacity onPress={toggleModal} style={tailwind('flex-row items-center border px-4 py-2 border-red-500 rounded-2xl bg-red-100')}>
                            <Text style={tailwind(`font-poppins-500 text-red-500 mr-6`)}>{t(statusName)}</Text>
                            <ArrowDownTwoIcon></ArrowDownTwoIcon>
                        </TouchableOpacity>
                    </View>
                    <Gap size={'h-4'}></Gap>
                    <ScrollView style={tailwind('h-5/6')}>
                        {
                            mounted ? <Text style={tailwind('font-poppins-400 text-lg')}>{'Loading......'}</Text> :
                                history.map((dm, i) => {
                                    return (
                                        <View key={i}>
                                            <View style={tailwind('flex-row mb-1')}>
                                                <View style={tailwind('mr-1')}>
                                                    <ClockIcon></ClockIcon>
                                                </View>
                                                <Text style={tailwind(`font-poppins-400 text-gray-500 text-xs opacity-60`)}>{dm.details[0].schedule.date}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => navigation.navigate('HistoryDetail', { screen: 'HistoryDetail', params: { transaction: dm } })} style={tailwind('shadow-card px-4 py-3 mb-3 bg-white rounded-2xl')}>
                                                <View style={tailwind('flex-row')}>
                                                    <TouchableOpacity style={tailwind('px-2 py-1 bg-gray-100 rounded-md mb-2')}>
                                                        <Text style={tailwind(`font-poppins-400 text-xs text-gray-400`)}>{dm.status.name}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={tailwind('flex-row justify-between')}>
                                                    <View style={tailwind('w-full flex-row items-center')}>
                                                        <View style={tailwind('mr-3')}>
                                                            <UserAvatar name="Finenna" size={50} />
                                                        </View>
                                                        <View>
                                                            <Text style={tailwind(`font-poppins-500 text-sm`)}>
                                                                {dm.details[0].schedule.user.name}
                                                            </Text>
                                                            <Text style={tailwind(`font-poppins-400 text-gray-500 text-xs opacity-60`)}>
                                                                {t('available') + ' ' + dm.details[0].schedule.time_start + ' - ' + dm.details[0].schedule.time_end}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                        }
                    </ScrollView>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={tailwind('flex-1')}>
                    <TouchableOpacity
                        onPress={toggleModal}
                        style={tailwind('h-full bg-black opacity-20')}
                    />
                    <View style={tailwind('absolute bottom-0 w-full rounded-3xl bg-white h-3/5')}>
                        <View style={tailwind('p-4 flex-row items-center')}>
                            <TouchableOpacity onPress={toggleModal}>
                                <CloseIcon></CloseIcon>
                            </TouchableOpacity>
                            <Text style={tailwind('items-center pl-2 font-poppins-600')}>{t('chooseStatusHistory')}</Text>
                        </View>
                        <View style={tailwind('px-4')}>
                            {
                                arrStatus.map((s, i) => {
                                    return (<View key={i} style={tailwind('py-3 mb-2 border-0 color-line-border border-b flex-row justify-between items-center')}>
                                        <Text style={tailwind('items-center pl-2 font-poppins-400')}>{t(s)}</Text>
                                        <TouchableOpacity>
                                            {
                                                statusName == s ?
                                                    <RadioButtonActiveIcon /> :
                                                    <TouchableOpacity onPress={() => changeStatus(s)}><RadioButtonIcon /></TouchableOpacity>
                                            }

                                        </TouchableOpacity>
                                    </View>)
                                })
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default index
