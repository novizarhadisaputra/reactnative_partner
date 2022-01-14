import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Linking, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon, ChatBtnIcon, CloseIcon, InfoCircleIcon, ShareIcon } from '../../assets/icons';
import { dummyPhoto } from '../../assets/images';
import { ButtonForm, Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { getDetailUser } from '../../services/user';

const detail = ({ route, navigation }) => {
    const params = route.params;
    const state = useSelector(state => state);
    const { now, time } = state.homeReducer;
    const goBack = () => navigation.goBack();
    const [modal, setmodal] = useState(false);
    const [mount, setmount] = useState(true);
    const [profile, setProfile] = useState(null);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setmodal(!modal)
    };
    const gotoPartnerSchedule = (partner) => navigation.navigate('PartnerSchedule', { screen: 'PartnerSchedule', params: { partner } });
    const gotoOrder = (partner) => navigation.navigate('Order', { screen: 'Order', params: { partner } });
    const redirectToWhatsApp = (wa) => Linking.openURL(`https://api.whatsapp.com/send?phone=${wa}&text=Hello ${profile.name}`);
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
    const { t, i18n } = useTranslation();
    useEffect(() => {
        async function loadProfile() {
            let response = await getDetailUser(params.partner.id);
            setProfile(response.user);
            setmount(false);
        }
        loadProfile()
        return () => {

        }
    }, [])
    return (
        <SafeAreaView>
            <View style={tailwind('h-full w-full bg-detail-partner')}>
                <View style={tailwind('absolute top-0 h-1/3 w-full')}>
                    <Image
                        style={tailwind('w-full h-full')}
                        source={dummyPhoto}
                    />
                </View>
                <View
                    style={tailwind('h-1/3 p-4 flex-row justify-between items-start')}>
                    <TouchableOpacity onPress={goBack}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ShareIcon></ShareIcon>
                    </TouchableOpacity>
                </View>
                <View style={tailwind('h-20 bg-white justify-center items-center')}>
                    <Text style={tailwind('font-poppins-500 text-xl')}>
                        {params.partner.name}
                    </Text>
                    <Text style={tailwind('font-poppins-400 text-sm opacity-60')}>
                        {`${params.partner.detail.city}, ${params.partner.detail.province}`}
                    </Text>
                </View>
                <Gap size={'h-3'}></Gap>
                <View style={tailwind('p-4 h-32 bg-white justify-center')}>
                    <Text style={tailwind('font-roboto-400 text-xs opacity-60')}>
                        {params.partner.detail.description}
                    </Text>
                </View>
                <Gap size={'h-3'}></Gap>
                <View style={tailwind('px-4')}>
                    <View style={tailwind('rounded-md border border-green-custom py-2 px-4 flex-row justify-between items-center')}>
                        <Text style={tailwind('color-green-custom font-poppins-600 text-xs')}>{`${t('youDecideOn')} ${moment(new Date(now)).format("DD MMMM")}`}</Text>
                        <InfoCircleIcon></InfoCircleIcon>
                    </View>
                </View>
                <Gap size={'h-3'}></Gap>
                <View style={tailwind('px-4')}>
                    <View style={tailwind('flex-row justify-between items-center')}>
                        <Text style={tailwind('font-poppins-500 text-base')}>{`${t('scheduleList')} ${params.partner.name}`}</Text>
                        <TouchableOpacity onPress={() => gotoPartnerSchedule(params.partner)}>
                            <Text style={tailwind('color-green-custom font-poppins-500 text-sm')}>{t('seeMore')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Gap size={'h-2'}></Gap>
                    <ScrollView style={tailwind('h-32')}>
                        {
                            mount ? <Text style={tailwind('font-poppins-400 text-lg')}>Loading...</Text> :
                                profile.schedules.map((s, i) =>
                                    <TouchableOpacity
                                        onPress={() => changeDate(s.date)}
                                        key={i}
                                        style={tailwind(`flex-row border ${s.date == moment(new Date(now)).format("YYYY-MM-D") ? 'border-green-500' : 'color-border-gray'} mb-2 flex-row justify-between rounded-md w-full h-14 items-center p-4`)}>
                                        <View>
                                            <Text style={tailwind(`font-poppins-400 text-sm`)}>
                                                {moment(new Date(s.date)).format("DD MMMM YYYY")}
                                            </Text>
                                            <Text style={tailwind(`font-poppins-400 text-gray-500 text-xs`)}>
                                                {t('available')} {s.time_start} - {s.time_end}
                                            </Text>
                                        </View>
                                        <Text style={tailwind('font-poppins-400 opacity-80 color-green-custom text-sm')}>{s.is_available ? 'Tersedia' : 'Tidak Tersedia'}</Text>
                                    </TouchableOpacity>
                                )
                        }
                    </ScrollView>
                </View>
                <View style={tailwind('absolute w-full bottom-0 px-4 h-20 flex-row justify-between items-center')}>
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
                                <Text style={tailwind('text-justify text-sm font-poppins-400 opacity-60')}>{`${params.partner.name} tersedia di tanggal ${moment(new Date(now)).format("DD MMMM YYYY")}, Anda bisa menggunakan jasa Tania di tanggal yang anda inginkan. untuk lebih detailnya silahkan periksa di bagian Daftar jadwal ${params.partner.name} `}</Text>
                                <Gap size={'h-10'}></Gap>
                                <TouchableOpacity onPress={() => {
                                    toggleModal();
                                    gotoPartnerSchedule();
                                }}>
                                    <Text style={tailwind('text-center text-sm font-poppins-500 text-green-500')}>{t('checkSchedule')}</Text>
                                </TouchableOpacity>
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
            </View>
        </SafeAreaView>
    )
}

export default detail

