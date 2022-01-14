import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownIcon, ChatBtnIcon, CloseIcon, RadioButtonActiveIcon, RadioButtonIcon } from '../../assets/icons';
import { ButtonForm, Gap } from '../../components';
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
    const [month, setmonth] = useState(moment(new Date(now)).format('MMM').toString());
    const [modalMonth, setmodalMonth] = useState(false);
    const [mounted, setmounted] = useState(true);
    const [profile, setProfile] = useState(null);
    const [schedules, setschedules] = useState(null);
    const [filter, setfilter] = useState([]);
    const dispatch = useDispatch();
    const toggleModal = () => setmodal(!modal)
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
        console.log(`data`, data);
        setfilter(data);
    }

    const gotoOrder = (partner) => navigation.navigate('Order', { screen: 'Order', params: { partner } });
    const redirectToWhatsApp = (wa) => Linking.openURL(`https://api.whatsapp.com/send?phone=${wa}&text=Hello ${profile.name}`);
    useEffect(() => {
        async function loadProfile() {
            let response = await getDetailUser(params.partner.id);
            setProfile(response.user);
            setschedules(response.user.schedules);
            filtering(month, response.user.schedules);
            setmounted(false);
        }
        loadProfile()
        return () => {

        }
    }, [])
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center justify-between')}>
                    <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{`${t('scheduleList')} ${params.partner.name}`}</Text>
                    <TouchableOpacity onPress={goBack}>
                        <CloseIcon></CloseIcon>
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
                    <ScrollView style={tailwind('h-3/4')}>
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
                <View style={tailwind('absolute w-full bottom-0 px-4 h-20 flex-row justify-between items-end')}>
                    <View style={tailwind('border border-green-custom h-14 rounded-xl w-1/6')}>
                        <TouchableOpacity onPress={() => redirectToWhatsApp(profile.detail.phone)} style={tailwind('h-full w-full flex-row items-center justify-center')}>
                            <ChatBtnIcon width={tailwind('w-full').width} height={tailwind('h-3/5').height}></ChatBtnIcon>
                        </TouchableOpacity>
                    </View>
                    <View style={tailwind('h-14 rounded-xl w-3/4')}>
                        <ButtonForm action={toggleModal} buttonText={t('submitRequest')}></ButtonForm>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                >
                    <View style={tailwind('flex-1')}>
                        <View style={tailwind('h-full w-full justify-center items-center')}>
                            <View style={tailwind('absolute h-full w-full bg-gray-800 opacity-40')}></View>
                            <View style={tailwind('bg-white p-4 rounded-3xl w-4/5 h-2/5')}>
                                <View style={tailwind('flex-row items-center')}>
                                    <TouchableOpacity onPress={toggleModal}>
                                        <CloseIcon></CloseIcon>
                                    </TouchableOpacity>
                                    <Text style={tailwind('ml-2 font-poppins-600')}>{t('information')}</Text>
                                </View>
                                <Gap size={'h-3'}></Gap>
                                <Text style={tailwind('text-justify text-sm font-poppins-400 opacity-60')}>{`${params.partner.name} tersedia di tanggal ${moment(new Date(now)).format("DD MMMM YYYY")}, Anda bisa menggunakan jasa Tania di tanggal yang anda inginkan.`}</Text>
                                <Gap size={'h-10'}></Gap>

                                <Gap size={'h-3'}></Gap>
                                <View style={tailwind('px-4')}>
                                    <ButtonForm action={() => {
                                        toggleModal();
                                        gotoOrder(params.partner);
                                    }} buttonText={t('submitRequest')}></ButtonForm>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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
