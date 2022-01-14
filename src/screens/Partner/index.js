import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownIcon, ChatIcon, CloseIcon } from '../../assets/icons';
import { Gap, InputForm } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { changeFormatDate } from '../../helper/global';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getDataPartner } from '../../services';
import { dummyPhoto } from '../../assets/images';
import { Controller, useForm } from "react-hook-form";

const index = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { t, i18n } = useTranslation();
    const regions = [t('all'), 'Yogyakarta', 'Boyolali'];
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [show, setShow] = useState(false);
    const { now, sex, province } = state.homeReducer;
    const [partners, setpartners] = useState([])
    const [mounted, setmounted] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const { hasNotification, hasSubmit, language } = state.globalReducer;
    const borderActive = tailwind(`border ${language == 'en' ? 'w-24': ''} px-4 py-2 border-red-600 rounded-2xl bg-red-600`);
    const borderNonActive = tailwind(`border ${language == 'en' ? 'w-24': ''} color-border-gray px-4 py-2 rounded-2xl`);

    const showCalendar = () => setShow(!show)
    const onSubmit = (data) => changeRegion(data.province);
    const changeRegion = async (selectedRegion) => {
        setmounted(true);
        const currentDate = moment().tz('Asia/Jakarta').format("YYYY-MM-DD");
        let selected = moment(new Date(now)).tz('Asia/Jakarta').format("YYYY-MM-DD");
        if ((new Date(selected) > new Date(currentDate))) {
            selected = moment(new Date(now)).tz('Asia/Jakarta').format("YYYY-MM-DD");
        } else {
            selected = moment(new Date(now)).tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss");
        }
        const response = await getDataPartner(selected, selectedRegion, sex).then(result => {
            setpartners(result.partners)
            setmounted(false);
            setModalVisible(false);
        });
        dispatch({ type: 'SET_PROVINCE', value: { province: selectedRegion } });
    }

    const changeSex = async (selectedSex) => {
        setmounted(true);
        const currentDate = moment().format("YYYY-MM-DD");
        let selected = moment(new Date(now)).format("YYYY-MM-DD");
        if ((new Date(selected) > new Date(currentDate))) {
            selected = moment(new Date(now)).format("YYYY-MM-DD");
        } else {
            selected = moment(new Date(now)).format("YYYY-MM-DD HH:mm:ss");
        }
        const response = await getDataPartner(selected, province, selectedSex).then(result => {
            setpartners(result.partners)
            setmounted(false);
        });
        dispatch({ type: 'SET_SEX', value: { sex: selectedSex } });
    }

    const changeDate = async (selectedDate) => {
        const currentDate = moment().format("YYYY-MM-DD");
        let selected = moment(new Date(selectedDate)).format("YYYY-MM-DD");
        if ((new Date(selected) > new Date(currentDate))) {
            selected = moment(new Date(selectedDate)).format("YYYY-MM-DD");
        } else {
            selected = moment(new Date(selectedDate)).format("YYYY-MM-DD HH:mm:ss");
        }
        setmounted(true);
        const response = await getDataPartner(selected, province, sex).then(result => {
            setpartners(result.partners)
            setmounted(false);
        });

        dispatch({ type: 'SET_DATE', value: { now: selectedDate } });
        setShow(!show);
    }

    const gotoParnerDetail = (p) => {
        navigation.navigate('PartnerDetail', {
            screen: 'PartnerDetail',
            params: { partner: p },
        });

    }

    useEffect(() => {
        async function loadPartnerData() {
            let date = `${moment(new Date(now)).tz('Asia/Jakarta').format("YYYY-MM-DD")} ${moment().tz('Asia/Jakarta').format('HH:mm:ss')}`;
            const response = await getDataPartner(date, province, sex);
            setpartners(response.partners);
            setmounted(false);
        }
        if (mounted) {
            loadPartnerData();
        }
        return () => setmounted(false);
    }, [])
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center justify-between')}>
                    <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{t('signLanguageInterpreter')}</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CloseIcon></CloseIcon>
                    </TouchableOpacity>
                </View>
                <View style={tailwind('p-4')}>
                    <View style={tailwind('flex-row w-full mb-3')}>
                        <Text style={tailwind(`font-poppins-400 items-center opacity-60`)}>{t('region') + ': '}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={tailwind('flex-row w-4/12 justify-between')}>
                            <Text numberOfLines={1} style={tailwind(`font-poppins-500 flex-shrink w-1/2 text-right`)}>{province != 'All' ? province : t('all')}</Text>
                            <View style={tailwind('pl-2 w-1/2')}>
                                <ArrowDownIcon></ArrowDownIcon>
                            </View>
                        </TouchableOpacity>
                        <Text style={tailwind(`font-poppins-400 items-center opacity-60`)}>{t('month') + ': '}</Text>
                        <TouchableOpacity onPress={showCalendar} style={tailwind('flex-row w-6/12 justify-between')}>
                            <Text numberOfLines={1} style={tailwind(`font-poppins-500 w-1/2 text-right`)}>{changeFormatDate(now)}</Text>
                            <View style={tailwind('pl-2 w-1/2')}>
                                <ArrowDownIcon></ArrowDownIcon>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            date={new Date(now)}
                            isVisible={show}
                            mode="date"
                            onConfirm={changeDate}
                            onCancel={showCalendar}
                        />
                    </View>
                    <View style={tailwind('flex-row w-11/12 justify-between')}>
                        <TouchableOpacity onPress={() => changeSex('All')} style={sex == 'All' ? borderActive : borderNonActive}>
                            <Text style={tailwind(`${sex == 'All' ? 'font-poppins-500 text-center text-white' : 'text-center font-poppins-400 opacity-60'}`)}>{t('all')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSex('Man')} style={sex == 'Man' ? borderActive : borderNonActive}>
                            <Text style={tailwind(`${sex == 'Man' ? 'font-poppins-500 text-center text-white' : 'text-center font-poppins-400 opacity-60'}`)}>{t('man')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSex('Woman')} style={sex == 'Woman' ? borderActive : borderNonActive}>
                            <Text style={tailwind(`${sex == 'Woman' ? 'font-poppins-500 text-center text-white' : 'text-center font-poppins-400 opacity-60'}`)}>{t('woman')}</Text>
                        </TouchableOpacity>
                    </View>

                    <Gap size={'h-4'}></Gap>
                    {/* List JBI */}
                    <ScrollView>
                        {
                            mounted ? <Text style={tailwind('font-poppins-400 text-lg')}>{'Loading......'}</Text> : partners.map((p, i) =>
                                <TouchableOpacity key={i} onPress={() => gotoParnerDetail(p)} style={tailwind('flex-row shadow-card px-4 py-5 mb-3 items-center justify-between bg-white rounded-2xl')}>
                                    <Image source={dummyPhoto} style={tailwind('rounded-full w-10 h-10')} />
                                    <View style={tailwind('w-10/12 flex-row justify-between items-center')}>
                                        <View>
                                            <Text style={tailwind(`font-poppins-500 text-sm`)}>
                                                {p.name}
                                            </Text>
                                            <Text style={tailwind(`font-poppins-400 text-xs`)}>
                                                {`Tersedia pukul ${p.schedules[0].time_start} - ${p.schedules[0].time_end}`}
                                            </Text>
                                        </View>
                                        <View>
                                            <ChatIcon></ChatIcon>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
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
                    <View style={tailwind('h-full w-full justify-center items-center')}>
                        <View style={tailwind('absolute h-full w-full bg-gray-800 opacity-40')}></View>
                        <View style={tailwind('bg-white rounded-xl w-4/5 h-1/5 px-4 justify-center')}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <InputForm
                                        borderColor={errors.email ? `border-red-300` : `border-gray-200`}
                                        label={t('search') + ' ' + t('region')}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        backgroundColor={'bg-gray-200'}
                                        placeholder={t('search') + ' ' + t('region')}>
                                    </InputForm>
                                )}
                                name="province"
                                defaultValue={province}
                            />
                            <Gap size={'h-3'} />
                            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tailwind('w-1/2 h-10 bg-green-600 rounded justify-center items-center')}>
                                <Text style={tailwind('text-white')}>{t('search')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({})
