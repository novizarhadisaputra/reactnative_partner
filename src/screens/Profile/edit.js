import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon, dummyPhoto, EmailIcon, FileIcon, PhoneIcon, UsernameIcon } from '../../assets';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { updateField } from '../../services';

const edit = ({ navigation }) => {
    const state = useSelector(state => state);
    const { user, tmpUser } = state.profileReducer;
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const goBack = () => {
        dispatch({ type: 'SET_TMP_USER', value: { tmpUser: null } });
        navigation.goBack();
    }

    const gotoValueField = (field) => {
        navigation.navigate('ChangeValueField', { screen: 'ChangeValueField', params: { field } });
    }

    const gotoChangeAvatar = () => {
        navigation.navigate('ChangeAvatar');
    }

    const save = async () => {
        let request = tmpUser ? tmpUser : user;
        let response = await updateField(request, user.id);
        dispatch({ type: 'SET_TMP_USER', value: { tmpUser: response.user } });
        dispatch({ type: 'SET_USER', value: { user: response.user } });
        dispatch({ type: 'SET_PROFILE', value: { profile: response.user } });
        navigation.navigate('Profile');
    }

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
                    <Text style={tailwind(`font-poppins-600 pl-4 text-xl mr-3 text-black`)}>{t('editProfile')}</Text>
                </View>
                <Gap size={'h-8'} />
                <View style={tailwind('justify-center items-center px-4')}>
                    <Text style={tailwind('font-poppins-600 text-sm')}>{t('photoProfile')}</Text>
                    <Gap size={'h-2'} />
                    <Image style={tailwind('h-20 w-20 rounded-full')} source={user?.image?.url ? { uri: user.image.url } : dummyPhoto} />
                    <Gap size={'h-2'} />
                    <TouchableOpacity onPress={gotoChangeAvatar}>
                        <Text style={tailwind('font-poppins-400 text-xs')}>{t('editPhoto')}</Text>
                    </TouchableOpacity>
                    <Gap size={'h-1'} />
                    <Text style={tailwind('text-xs font-poppins-300 text-center')}>{t('editPhotoDescription')}</Text>
                    <Gap size={'h-10'} />
                    <TouchableOpacity onPress={() => gotoValueField('name')} style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                        <View style={tailwind('w-4')}>
                            <UsernameIcon />
                        </View>
                        <Text style={tailwind('pl-4 font-poppins-400 text-sm')}>{tmpUser ? tmpUser.name : user.name}</Text>
                    </TouchableOpacity>
                    <Gap size={'h-3'} />
                    <TouchableOpacity onPress={() => gotoValueField('email')} style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                        <View style={tailwind('w-4')}>
                            <EmailIcon />
                        </View>
                        <Text style={tailwind('pl-4 font-poppins-400 text-sm')}>{tmpUser ? tmpUser.email : user.email}</Text>
                    </TouchableOpacity>
                    <Gap size={'h-3'} />
                    <TouchableOpacity onPress={() => gotoValueField('phone')} style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                        <View style={tailwind('w-4')}>
                            <PhoneIcon />
                        </View>
                        <Text style={tailwind('pl-4 font-poppins-400 text-sm')}>{tmpUser ? tmpUser.phone : user.phone}</Text>
                    </TouchableOpacity>
                    <Gap size={'h-3'} />
                    <TouchableOpacity onPress={() => gotoValueField('description')} style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                        <View style={tailwind('w-4')}>
                            <FileIcon />
                        </View>
                        <Text style={tailwind('pl-4 font-poppins-400 text-sm')}>{tmpUser ? tmpUser.description : user.description}</Text>
                    </TouchableOpacity>
                    <Gap size={'h-20'} />
                    <TouchableOpacity onPress={save} style={tailwind('flex-row w-full justify-center items-center border border-red-600 bg-red-400 h-14 rounded-lg')}>
                        <Text style={tailwind('text-base font-poppins-600 text-white')}>{'Simpan'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default edit

const styles = StyleSheet.create({})
