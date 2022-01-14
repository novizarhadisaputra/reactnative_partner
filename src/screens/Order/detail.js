import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { useDispatch } from 'react-redux';
import { BackIcon } from '../../assets/icons';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';

const detail = ({ navigation }) => {
    const goBack = () => navigation.goBack();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [statusOrder, setStatusOrder] = useState('Ongoing')
    const showCalendar = () => setShow(!show)
    useEffect(() => {

        return () => {

        }
    }, []);
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center')}>
                    <TouchableOpacity onPress={goBack}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>
                    <Text style={tailwind(`font-poppins-600 pl-4 text-2xl mr-3 text-black`)}>{t('eventDetail')}</Text>
                </View>
                <View style={tailwind('h-20 bg-on-going items-center justify-center')}>
                    <Text style={tailwind('font-poppins-400 text-sm color-on-going')}>{statusOrder}</Text>
                </View>
                <View style={tailwind('px-4 py-6')}>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('orderNumber')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{'240720210018'}</Text>
                    </View>
                    <Gap size={'h-2'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('transactionDate')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{'12-07-2021'}</Text>
                    </View>
                    <Gap size={'h-8'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('duration')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{'3 Hari'}</Text>
                    </View>
                    <Gap size={'h-2'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('eventDate')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{'29,30,31 Juli 2021'}</Text>
                    </View>
                    <Gap size={'h-2'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('time')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{'09.00 sd 11.00'}</Text>
                    </View>
                    <Gap size={'h-8'}></Gap>
                    <View>
                        <Text style={tailwind('font-poppins-600 text-base')}>{t('signLanguageInterpreter')}</Text>
                        <Gap size={'h-2'}></Gap>
                        <TouchableOpacity style={tailwind('shadow-card px-4 py-5 mb-3 bg-white rounded-2xl')}>
                           <View style={tailwind('flex-row justify-between')}>
                                <View style={tailwind('w-full flex-row items-center')}>
                                    <View style={tailwind('mr-3')}>
                                        <UserAvatar name="Finenna" size={50} />
                                    </View>
                                    <View>
                                        <Text style={tailwind(` text-sm`)}>
                                            {'dm.name'}
                                        </Text>
                                        <Text style={tailwind(` text-gray-500 text-xs opacity-60`)}>
                                            {'dm.schedule'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default detail

const styles = StyleSheet.create({})
