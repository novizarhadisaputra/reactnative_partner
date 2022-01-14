var moment = require('moment-timezone');
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { AlertIcon, ArrowDownIcon, BackIcon, ErrorIcon } from '../../assets/icons';
import { ButtonForm, Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { getDataTimeSchedule, storeOrder } from '../../services';

const index = ({ navigation, route }) => {
    const params = route.params;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { language, message, showModal, isError } = state.globalReducer;
    const { now } = state.homeReducer;
    const {
        payment_method_id,
        details,
        notes,
        voucher_id,
        total_price,
        total_paid,
        transaction_status_id
    } = state.orderReducer;
    const [markedDates, setmarkedDates] = useState(null);
    const [listTime, setlistTime] = useState([]);
    const [mounted, setmounted] = useState(true)


    const createOrder = async () => {
        if (!details) {
            dispatch({ type: 'SET_ERROR', value: { message: 'Peringatan! Tolong lengkapi datanya', isError: true } });
            dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } })
            return;
        }
        const dataOrder = {
            total_price,
            total_paid,
            payment_method_id,
            transaction_status_id,
            voucher_id,
            details,
            notes
        }
        const response = await storeOrder(dataOrder);
        if (!response.transaction) {
            dispatch({ type: 'SET_ERROR', value: { message: 'Peringatan! Kesalahan Server', isError: true } });
            dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } })
            return;
        }
        dispatch({ type: 'SET_SUCCESS', value: { message: `Order dengan ID ${response.transaction.id} berhasil`, isError: true } });
        dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } });
        setInterval(() => {
            navigation.navigate('History');
        }, 1500);

    }

    const changeNotes = async (v) => {
        dispatch({ type: 'SET_NOTES_ORDER', value: { notes: v } })
    }

    const changeLisTime = async (val) => {
        const currentDate = moment().format("YYYY-MM-DD");
        let selected = moment(new Date(val)).format("YYYY-MM-DD");
        if ((new Date(selected) > new Date(currentDate))) {
            selected = moment(new Date(val)).format("YYYY-MM-DD");
        } else {
            selected = moment(new Date(val)).format("YYYY-MM-DD HH:mm:ss");
        }
        let times = await getDataTimeSchedule(params.partner.id, selected);
        times = times.schedules;
        if (!times.length) times = [''];
        setlistTime(times);

    }

    const changeMarkedDate = (v) => {
        let data = {};
        let tmp = moment(new Date(v.dateString)).tz('Asia/Jakarta').format("YYYY-MM-DD");
        data[tmp] = {
            customStyles: {
                container: {
                    backgroundColor: '#DAE9E4',
                    borderRadius: 0
                },
                text: {
                    fontFamily: 'Poppins-Medium',
                    color: '#42AA8B',
                }
            }
        };
        changeLisTime(tmp);
        setmarkedDates(data)
        dispatch({ type: 'SET_DATE', value: { now: v.dateString } });
    }

    LocaleConfig.locales[language] = {
        monthNames: [t('Jan'), t('Feb'), t('Mar'), t('Apr'), t('May'), t('Jun'), t('Jul'), t('Aug'), t('Sep'), t('Oct'), t('Nov'), t('Dec')],
        dayNames: [t('Sunday'), t('Monday'), t('Tuesday'), t('Wednesday'), t('Thursday'), t('Friday'), t('Saturday')],
        dayNamesShort: [t('Sun'), t('Mon'), t('Tue'), t('Wed'), t('Thu'), t('Fri'), t('Sat')],
    };
    LocaleConfig.defaultLocale = language;

    useEffect(() => {
        async function iniateSchedule() {
            let data = {};
            let tmp = `${moment(new Date(now)).tz('Asia/Jakarta').format("YYYY-MM-DD")}`;
            let times = await getDataTimeSchedule(params.partner.id, tmp);
            times = times.schedules;
            if (!times.length) times = [''];
            setlistTime(times);
            data[tmp] = {
                customStyles: {
                    container: {
                        backgroundColor: '#DAE9E4',
                        borderRadius: 0
                    },
                    text: {
                        fontFamily: 'Poppins-Medium',
                        color: '#42AA8B',
                    }
                }
            };
            setmarkedDates(data)
        }
        if (mounted) iniateSchedule();
        return () => setmounted(false);
    }, [])

    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-200 flex')}>
                <View style={tailwind('flex-row p-4 bg-white items-center')}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>
                    <Text style={tailwind(`font-poppins-600 pl-4 text-xl text-black`)}>{t('setSchedule')}</Text>
                </View>
                <Gap size={'h-5'} />
                <View style={tailwind('p-4 bg-white w-full')}>
                    <Calendar
                        markingType={'custom'}
                        onDayPress={changeMarkedDate}
                        markedDates={markedDates}
                    />
                </View>
                <Gap size={'h-5'}></Gap>
                <View style={tailwind('p-4 bg-white w-full')}>
                    <Text style={tailwind('text-base font-poppins-500')}>{t('setTimeEvent')}</Text>
                    <Gap size={'h-2'}></Gap>
                    <View style={tailwind('flex-row justify-between')}>
                        <View style={tailwind('w-full')}>
                            <Text style={tailwind('font-poppins-400 text-sm opacity-60')}>{t('time')}</Text>
                            <Gap size={'h-1'}></Gap>
                            <SelectDropdown
                                data={listTime}
                                buttonStyle={tailwind('border w-full bg-white border-red-400 h-10 rounded-md')}
                                buttonTextStyle={tailwind('text-red-400')}
                                onSelect={(selectedItem, index) => {
                                    let data = [{
                                        "schedule_id": selectedItem.id,
                                        "user_id": selectedItem.user_id,
                                        "total_price": 0,
                                        "total_paid": 0,
                                        "voucher_id": ''
                                    }];
                                    dispatch({ type: 'SET_DETAILS_ORDER', value: { details: data } })
                                    return (`${selectedItem.date} ${selectedItem.time_start} - ${selectedItem.time_end}`);
                                }}
                                renderCustomizedButtonChild={(selectedItem, index) => {
                                    return (
                                        <View style={tailwind('flex-row w-full justify-between items-center')}>
                                            <Text style={tailwind('w-full text-center text-lg font-poppins-400')}>
                                                {selectedItem ? (`${selectedItem.date} ${selectedItem.time_start} - ${selectedItem.time_end}`) : t("selectTime")}
                                            </Text>
                                        </View>
                                    );
                                }}
                                renderCustomizedRowChild={(item, index) => {
                                    return (
                                        <Text style={tailwind('w-full text-center text-sm font-poppins-400')}>{item && (`${item.date} ${item.time_start} - ${item.time_end}`)}</Text>
                                    );
                                }}
                                defaultButtonText={t("selectTime")}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                renderDropdownIcon={() => {
                                    return (
                                        <ArrowDownIcon></ArrowDownIcon>
                                    );
                                }}
                                dropdownIconPosition={"right"}
                            />
                        </View>
                    </View>
                </View>
                <Gap size={'h-5'}></Gap>
                <View style={tailwind('p-4 bg-white w-full')}>
                    <Text style={tailwind('text-base font-poppins-500')}>{t('addNote')}</Text>
                    <Gap size={'h-1'}></Gap>
                    <View style={tailwind('border border-red-200 bg-gray-100 px-4 py-2 rounded')}>
                        <TextInput
                            onChangeText={changeNotes}
                            multiline={true}
                            style={tailwind('h-11')}
                        />
                    </View>
                    <ButtonForm action={createOrder} buttonText={t('submitSchedule')}></ButtonForm>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                >
                    <View style={tailwind('flex-1')}>
                        <View style={tailwind('h-full w-full justify-center items-center')}>
                            <View style={tailwind('absolute h-full w-full bg-gray-800 opacity-40')}></View>
                            <View style={tailwind('bg-white rounded-3xl w-4/5 h-2/5 items-center')}>
                                <View style={tailwind('px-4 flex-row items-center')}>
                                    <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } })}>
                                        <AlertIcon height={tailwind('h-4/6').height}></AlertIcon>
                                    </TouchableOpacity>
                                </View>
                                <Text style={tailwind('text-center font-poppins-600')}>{message}</Text>
                                <Gap size={'h-3'}></Gap>
                                <TouchableOpacity onPress={() => dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } })} style={tailwind('w-1/2 h-10 bg-red-600 rounded justify-center items-center')}>
                                    <Text style={tailwind('text-white')}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default index
