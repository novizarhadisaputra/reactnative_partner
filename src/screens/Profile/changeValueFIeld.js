import React, { useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmailIcon, PhoneIcon, UsernameIcon, BackIcon, FileIcon } from '../../assets';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';


const changeValueField = ({ navigation, route }) => {
    const state = useSelector(state => state);
    const { user, tmpUser } = state.profileReducer;
    const { control, handleSubmit, formState: { errors } } = useForm();
    const field = route.params.field
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const goBack = () => {
        navigation.goBack()
    };
    const onSubmit = async (data) => {
        let merge = {
            ...tmpUser,
            ...user,
            ...data
        }
        dispatch({ type: 'SET_TMP_USER', value: { tmpUser: merge } });
        goBack();
    }

    useEffect(() => {
        return () => {

        }
    }, [tmpUser])

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
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            field == 'description' ? <View style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                                <View style={tailwind('w-4')}>
                                    <FileIcon />
                                </View>
                                <TextInput
                                    multiline={true}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value} style={tailwind('pl-4 w-11/12 font-poppins-400 text-sm')}></TextInput>
                            </View> :
                                field == 'name' ? <View style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                                    <View style={tailwind('w-4')}>
                                        <UsernameIcon />
                                    </View>
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value} style={tailwind('pl-4 w-11/12 font-poppins-400 text-sm')}></TextInput>
                                </View>
                                    :
                                    field == 'email' ? <View style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                                        <View style={tailwind('w-4')}>
                                            <EmailIcon />
                                        </View>
                                        <TextInput
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} style={tailwind('pl-4 w-11/12 font-poppins-400 text-sm')}></TextInput>
                                    </View>
                                        :
                                        field == 'phone' && <View style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                                            <View style={tailwind('w-4')}>
                                                <PhoneIcon />
                                            </View>
                                            <TextInput
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value} style={tailwind('pl-4 w-11/12 font-poppins-400 text-sm')}></TextInput>
                                        </View>

                        )}
                        name={field}
                        defaultValue={tmpUser ? tmpUser[field] : user[field]}
                    />
                    <Gap size={'h-10'} />
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tailwind('flex-row w-full justify-center items-center border border-red-600 bg-red-400 h-14 rounded-lg')}>
                        <Text style={tailwind('text-base font-poppins-600 text-white')}>{'Simpan'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default changeValueField

const styles = StyleSheet.create({})
