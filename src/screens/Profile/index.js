import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightIcon, CloseIcon, GlobeBlackIcon, KeyBlackIcon, NotificationBlackIcon, PencilIcon } from '../../assets/icons';
import { dummyPhoto } from '../../assets/images';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { getDataProfile, logout } from '../../services';
const index = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [mounted, setmounted] = useState(true)
    const { user } = state.profileReducer;
    const gotoBack = () => navigation.navigate('Tabs');
    const gotoEdit = () => navigation.navigate('ProfileEdit');
    const gotoChangeLangauge = () => navigation.navigate('ChangeLanguage');
    const gotoChangeNotification = () => navigation.navigate('ChangeNotification');
    const gotoChangePassword = () => navigation.navigate('ChangePassword');
    const submitLogout = async () => {
        const response = await logout();
        if (response) {
            dispatch({ type: 'REMOVE_USER', value: { profile: {}, user: {}, tmpUser: {} } })
        }
        navigation.replace('Login');
    }

    useEffect(() => {
        async function getProfile() {
            let res = await getDataProfile();
            dispatch({ type: 'SET_USER', value: { user: res } })
        }
        getProfile();
        if (mounted) {
            getProfile();
        }
        return () => setmounted(false);
    }, []);
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center justify-between')}>
                    <Text style={tailwind(`font-poppins-600 text-xl text-black`)}>{t('profile')}</Text>
                    {/* <TouchableOpacity onPress={gotoBack}>
                        <CloseIcon></CloseIcon>
                    </TouchableOpacity> */}
                </View>
                <View style={tailwind('flex-row px-4 h-1/5 w-full items-center justify-between')}>
                    <View>
                        <View style={tailwind('flex-row')}>
                            <Image source={user?.image?.url ? { uri: user.image.url } : dummyPhoto} style={tailwind('rounded-full w-16 h-16')}>
                            </Image>
                            {
                                user ?
                                    <View style={tailwind('pl-3')}>
                                        <Text style={tailwind('font-poppins-600 text-lg')}>{user.name}</Text>
                                        <Text style={tailwind('font-poppins-300 text-xs')}>{user.phone}</Text>
                                        <Text style={tailwind('font-poppins-300 text-xs')}>{user.email}</Text>
                                    </View> : <View style={tailwind('pl-3')}>
                                        <Text style={tailwind('font-poppins-600 text-lg')}>{'-'}</Text>
                                        <Text style={tailwind('font-poppins-300 text-xs')}>{'-'}</Text>
                                        <Text style={tailwind('font-poppins-300 text-xs')}>{'-'}</Text>
                                    </View>
                            }
                        </View>
                    </View>
                    <TouchableOpacity onPress={gotoEdit}>
                        <PencilIcon></PencilIcon>
                    </TouchableOpacity>
                </View>
                <Gap size={'h-3'}></Gap>
                <View style={tailwind('px-4')}>
                    <Text>{t('account')}</Text>
                    <View style={tailwind('px-4')}>
                        <TouchableOpacity onPress={gotoChangePassword} style={tailwind('flex-row items-center justify-between')}>
                            <View style={tailwind('flex-row items-center')}>
                                <View style={tailwind('w-6')}>
                                    <KeyBlackIcon />
                                </View>
                                <Text style={tailwind('font-poppins-400 text-base p-2')}>{t('editPassword')}</Text>
                            </View>
                            <ArrowRightIcon></ArrowRightIcon>
                        </TouchableOpacity>
                        <Gap size={'h-3'}></Gap>
                        <TouchableOpacity onPress={gotoChangeNotification} style={tailwind('flex-row items-center justify-between')}>
                            <View style={tailwind('flex-row items-center')}>
                                <View style={tailwind('w-6')}>
                                    <NotificationBlackIcon />
                                </View>
                                <Text style={tailwind('font-poppins-400 text-base p-2')}>{t('notification')}</Text>
                            </View>
                            <ArrowRightIcon></ArrowRightIcon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={gotoChangeLangauge} style={tailwind('flex-row items-center justify-between')}>
                            <View style={tailwind('flex-row items-center')}>
                                <View style={tailwind('w-6')}>
                                    <GlobeBlackIcon />
                                </View>
                                <Text style={tailwind('font-poppins-400 text-base p-2')}>{t('selectLanguage')}</Text>
                            </View>
                            <ArrowRightIcon></ArrowRightIcon>
                        </TouchableOpacity>
                        <Gap size={'h-10'} />
                        <TouchableOpacity onPress={submitLogout} style={tailwind('border border-red-600 justify-center items-center h-10 rounded-xl')}>
                            <Text style={tailwind('font-poppins-600 text-base text-red-600')}>{t('logout')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default index
