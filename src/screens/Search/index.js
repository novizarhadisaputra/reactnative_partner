import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownIcon, CloseIcon, RadioButtonActiveIcon, RadioButtonIcon, RefreshIcon } from '../../assets';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { months } from '../../helper/global';
import { getDetailUser } from '../../services/user';

const schedule = ({ route, navigation }) => {
    const goBack = () => navigation.goBack();
    const params = route.params;
    const { t, i18n } = useTranslation();
    const [modal, setmodal] = useState(false);
    const state = useSelector(state => state);
    const { now } = state.homeReducer;
    const { user } = state.profileReducer;
    const [month, setmonth] = useState(moment(new Date(now)).format('MMM').toString());
    const [modalMonth, setmodalMonth] = useState(false);
    const [mounted, setmounted] = useState(true);
    const [profile, setProfile] = useState(null);
    const [schedules, setschedules] = useState(null);
    const [filter, setfilter] = useState([]);
    const dispatch = useDispatch();
    const refresh = async () => {
        setmounted(true);
        let response = await getDetailUser(user.id);
        setProfile(response.user);
        setschedules(response.user.schedules);
        filtering(month, response.user.schedules);
        setmounted(false);
        console.log(`mounted`, mounted)
    }
    const toggleModalMonth = () => setmodalMonth(!modalMonth)
    const changeDate = async (selectedDate) => {
        const currentDate = moment().format("YYYY-MM-DD");
        let selected = moment(new Date(selectedDate)).format("YYYY-MM-DD");
        if ((new Date(selected) > new Date(currentDate))) {
            selected = moment(new Date(selectedDate)).format("YYYY-MM-DD");
        } else {
            selected = moment(new Date(selectedDate)).format("YYYY-MM-DD HH:mm:ss");
        }

        dispatch({ type: 'SET_DATE', value: { now: selectedDate } });
    }

    const changeMonth = (m) => {
        setmonth(m);
        setmounted(true);
        filtering(m, schedules);
        setmounted(false);

    }

    const filtering = (m = '', dataset) => {
        let data = dataset;
        if (m != 'all') {
            data = data.filter(v => moment(new Date(v.date)).format("MMM") == m);
        }
        setfilter(data);
    }

    useEffect(() => {
        async function loadProfile() {
            let response = await getDetailUser(user.id);
            setProfile(response.user);
            setschedules(response.user.schedules);
            filtering(month, response.user.schedules);
            setmounted(false);
            console.log(`mounted`, mounted)
        }
        loadProfile()
        return () => {

        }
    }, [])
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center justify-between')}>
                    <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{`${t('scheduleList')} ${user.name}`}</Text>
                    <TouchableOpacity onPress={() => refresh()}>
                        <RefreshIcon></RefreshIcon>
                    </TouchableOpacity>
                </View>
                <Gap size={'h-3'}></Gap>
                <View style={tailwind('px-4')}>
                    <View style={tailwind('flex-row w-full')}>
                        <Text style={tailwind(`font-poppins-400 items-center opacity-60`)}>{t('month') + ': '}</Text>
                        <TouchableOpacity onPress={toggleModalMonth} style={tailwind('flex-row w-6/12 justify-between')}>
                            <Text numberOfLines={1} style={tailwind(`font-poppins-500 w-1/2 text-right`)}>{t(month)}</Text>
                            <View style={tailwind('pl-2 w-1/2')}>
                                <ArrowDownIcon></ArrowDownIcon>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Gap size={'h-6'}></Gap>
                    <ScrollView style={tailwind('h-full')}>
                        {
                            mounted ? <Text style={tailwind('text-lg font-poppins-400')}>{'Loading...'}</Text> :
                                filter.map((v, i) => <TouchableOpacity onPress={() => changeDate(v.date)} key={i} style={tailwind(`flex-row border ${v.date == moment(new Date(now)).format("YYYY-MM-D") ? 'border-green-500' : 'color-border-gray'}  mb-2 flex-row justify-between rounded-md w-full h-14 items-center p-4`)}>
                                    <View>
                                        <Text style={tailwind(`font-poppins-400 text-xs`)}>
                                            {moment(new Date(v.date)).format("DD MMMM YYYY")}
                                        </Text>
                                        <Text style={tailwind(`font-poppins-400 text-gray-500 text-xs`)}>
                                            {t('available')} {v.time_start} - {v.time_end}
                                        </Text>
                                    </View>

                                    <Text style={tailwind('font-poppins-300 text-xs color-green-custom')}>{v.is_available ? 'Tersedia' : 'Tidak Tersedia'}</Text>
                                </TouchableOpacity>)
                        }
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalMonth}
                >
                    <View style={tailwind('flex-1')}>
                        <TouchableOpacity
                            onPress={toggleModalMonth}
                            style={tailwind('h-full bg-black opacity-20')}
                        />
                        <View style={tailwind('absolute bottom-0 pb-5 w-full rounded-3xl bg-white h-3/5')}>
                            <View style={tailwind('p-4 flex-row items-center')}>
                                <TouchableOpacity onPress={toggleModalMonth}>
                                    <CloseIcon></CloseIcon>
                                </TouchableOpacity>
                                <Text style={tailwind('items-center pl-2 font-poppins-600')}>{t('chooseMonth')}</Text>
                            </View>
                            <ScrollView style={tailwind('px-4')}>
                                {
                                    months.map((m, i) => {
                                        return (<View key={i} style={tailwind('py-3 mb-2 border-0 color-line-border border-b flex-row justify-between items-center')}>
                                            <Text style={tailwind('items-center pl-2 font-poppins-400')}>{t(m)}</Text>
                                            <TouchableOpacity>
                                                {
                                                    t(month) == t(m) ?
                                                        <RadioButtonActiveIcon /> :
                                                        <TouchableOpacity onPress={() => changeMonth(m)}><RadioButtonIcon /></TouchableOpacity>
                                                }

                                            </TouchableOpacity>
                                        </View>)
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default schedule
