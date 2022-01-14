import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon, CalendarIcon, ArrowRightIcon } from '../../assets';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { changeFormatDate } from '../../helper/global';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { storeDataTimeSchedule } from '../../services';


const set = ({ navigation }) => {
    // {
    //     "start": "2021-12-10",
    //     "end": "2021-12-31",
    //     "start-Sunday": [ "13:00" ],
    //     "end-Sunday": [ "14:00" ],
    //     "start-Monday": [ "13:00" ],
    //     "end-Monday": [ "14:00" ],
    //     "start-Tuesday": [ "13:00" ],
    //     "end-Tuesday": [ "14:00" ],
    //     "start-Wednesday": [ "13:00" ],
    //     "end-Wednesday": [ "14:00" ],
    //     "start-Thursday": [ "13:00" ],
    //     "end-Thursday": [ "14:00" ],
    //     "start-Friday": [ "13:00" ],
    //     "end-Friday": [ "14:00" ],
    //     "start-Saturday": [ "13:00" ],
    //     "end-Saturday": [ "14:00" ]
    // }
    
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { start, end } = state.scheduleReducer;

    const goBack = () => navigation.goBack();
    const gotoChangeValue = (field) => navigation.navigate('ChangeValueSchedule', { screen: 'ChangeValueSchedule', params: { field } });
    const [show, setshow] = useState(false);
    const [showTwo, setshowTwo] = useState(false);

    const handleSubmit = async () => {
        let data = state.scheduleReducer;
        let response = await storeDataTimeSchedule(data);
        navigation.navigate('Tabs');
        
    }

    const showCalendarOne = () => setshow(!show);
    const showCalendarTwo = () => setshowTwo(!showTwo);

    const changeDate = async (selectedDate, type) => {
        let selected = moment(new Date(selectedDate)).tz('Asia/Jakarta').format("YYYY-MM-DD");
        if (type == 'SET_STARTDATE') {
            dispatch({ type: type, value: { start: selected } });
            setshow(!show);
            return;
        } else {
            dispatch({ type: type, value: { end: selected } });
            setshowTwo(!showTwo);
            return;
        }
    }

    useEffect(() => {

        return () => {

        }
    }, []);
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center justify-between')}>
                    <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{t('setAvailability')}</Text>
                    <TouchableOpacity onPress={goBack}>
                        <CloseIcon></CloseIcon>
                    </TouchableOpacity>
                </View>
                <View style={tailwind('p-4')}>
                    <Gap size={'h-2'} />
                    <Text style={tailwind('font-poppins-600 text-sm')}>{'Tentukan ketersediaan '}</Text>
                    <Gap size={'h-1'} />
                    <Text style={tailwind('font-poppins-300 text-xs')}>{'Kamu bisa mengatur ketersediaan dalam jangka panjang maupun jangka pendek'}</Text>
                    <Gap size={'h-5'} />
                    <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                        <View style={tailwind('justify-center')}>
                            <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{changeFormatDate(start)}</Text>
                        </View>
                        <TouchableOpacity onPress={showCalendarOne} style={tailwind('items-center justify-center w-2/12')}>
                            <CalendarIcon></CalendarIcon>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        date={new Date(start)}
                        isVisible={show}
                        mode="date"
                        onConfirm={(date) => changeDate(date, 'SET_STARTDATE')}
                        onCancel={showCalendarOne}
                    />
                    <Gap size={'h-3'} />
                    <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                        <View style={tailwind('justify-center')}>
                            <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{changeFormatDate(end)}</Text>
                        </View>
                        <TouchableOpacity onPress={showCalendarTwo} style={tailwind('items-center justify-center w-2/12')}>
                            <CalendarIcon></CalendarIcon>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        date={new Date(end)}
                        isVisible={showTwo}
                        mode="date"
                        onConfirm={(date) => changeDate(date, 'SET_ENDDATE')}
                        onCancel={showCalendarTwo}
                    />
                </View>
                <Gap size={'h-5'} />
                <Text style={tailwind('px-4 font-poppins-600 text-sm')}>{'Tentukan ketersediaan '}</Text>
                <Gap size={'h-3'} />

                <ScrollView style={tailwind('h-2/5')}>
                    <View style={tailwind('px-4 pb-4')}>
                        {/* List days  */}
                        <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                            <View style={tailwind('justify-center w-10/12')}>
                                <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{t('Monday')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoChangeValue('Monday')} style={tailwind('items-center justify-center w-2/12')}>
                                <ArrowRightIcon></ArrowRightIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-3'} />
                        <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                            <View style={tailwind('justify-center w-10/12')}>
                                <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{t('Tuesday')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoChangeValue('Tuesday')} style={tailwind('items-center justify-center w-2/12')}>
                                <ArrowRightIcon></ArrowRightIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-3'} />
                        <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                            <View style={tailwind('justify-center w-10/12')}>
                                <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{t('Wednesday')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoChangeValue('Wednesday')} style={tailwind('items-center justify-center w-2/12')}>
                                <ArrowRightIcon></ArrowRightIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-3'} />
                        <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                            <View style={tailwind('justify-center w-10/12')}>
                                <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{t('Thursday')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoChangeValue('Thursday')} style={tailwind('items-center justify-center w-2/12')}>
                                <ArrowRightIcon></ArrowRightIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-3'} />
                        <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                            <View style={tailwind('justify-center w-10/12')}>
                                <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{t('Friday')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoChangeValue('Friday')} style={tailwind('items-center justify-center w-2/12')}>
                                <ArrowRightIcon></ArrowRightIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-3'} />
                        <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                            <View style={tailwind('justify-center w-10/12')}>
                                <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{t('Saturday')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoChangeValue('Saturday')} style={tailwind('items-center justify-center w-2/12')}>
                                <ArrowRightIcon></ArrowRightIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-3'} />
                        <View style={tailwind('flex-row pl-4 pr-2 border justify-between rounded-xl h-12 border-gray-300')}>
                            <View style={tailwind('justify-center w-10/12')}>
                                <Text style={tailwind(`font-poppins-500 text-sm text-left`)}>{t('Sunday')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoChangeValue('Sunday')} style={tailwind('items-center justify-center w-2/12')}>
                                <ArrowRightIcon></ArrowRightIcon>
                            </TouchableOpacity>
                        </View>
                        <Gap size={'h-3'} />
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={handleSubmit} style={tailwind('flex-row mx-4 items-center justify-center bg-red-600 rounded-xl h-14 mb-3')}>
                    <Text style={tailwind(`font-poppins-500 text-white text-center text-lg`)}>{t('submitSchedule')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default set
