import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorIcon, FireworksIcon } from '../../assets';
import { IllustrationForgotPassword } from '../../assets/icons';
import { ButtonForm, Gap, InputForm } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { updatePassword } from '../../services';

const index = ({ navigation, route }) => {
    const user = route.params.user;
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const { globalReducer } = useSelector(state => state);
    const { mounted, showModal, isError, message } = globalReducer;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const iconChange = () => setShow(!show);
    const iconChangeNew = () => setShowNew(!showNew);
    const onSubmit = async (data) => {
        if (data.newPassword.length < 8) {
            dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } });
            dispatch({ type: 'SET_ERROR', value: { message: 'Password at least 8 characters', isError: true } });
            return;
        } else if (data.newPassword != data.passwordConfirm) {
            dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } });
            dispatch({ type: 'SET_ERROR', value: { message: 'Password confirm not valid', isError: true } });
            return;
        } else {
            dispatch({ type: 'SET_MOUNTED', value: { mounted: true } });
            let request = {
                email: user.email,
                new_password: data.newPassword,
            }
            const response = await updatePassword(request);
            dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } });
            if (response?.user) {
                dispatch({ type: 'SET_SUCCESS', value: { message: 'Edit password success', isError: false } });
                setTimeout(() => {
                    dispatch({ type: 'SET_MOUNTED', value: { mounted: false } });
                    dispatch({ type: 'SHOW_MODAL', value: { showModal: false } });
                    navigation.navigate('Login')
                }, 3000);
                return
            }
            dispatch({ type: 'SET_ERROR', value: { message: 'Code not valid', isError: true } });
            dispatch({ type: 'SET_MOUNTED', value: { mounted: false } });
        }
    }

    const gotoLogin = () => navigation.navigate('Login');
    const toggleModal = () => {
        dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } });
        dispatch({ type: 'SET_SUCCESS', value: { message: '', isError: false } });
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView>
                <View style={tailwind('h-full w-full bg-red-600')}>
                    <View style={tailwind('h-1/3 w-full items-center')}>
                        <View style={tailwind('w-full h-full absolute -bottom-5')}>
                            <IllustrationForgotPassword width={tailwind('w-full').width} height={tailwind('h-full').height}></IllustrationForgotPassword>
                        </View>
                    </View>
                    <View style={tailwind('h-2/3 w-full bg-white rounded-t-3xl justify-center')}>
                        <View style={tailwind('px-4')}>
                            <Text style={tailwind(`font-poppins-600 text-xl`)}>{t('editPassword')}</Text>
                            <Text style={tailwind('text-sm w-full text-gray-500')}>{t('editPasswordDescription')}</Text>
                        </View>
                        <Gap size={'h-10'}></Gap>
                        <View style={tailwind('px-4 mb-3')}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <InputForm
                                        iconChange={iconChange}
                                        secureTextEntry={!show}
                                        borderColor={errors.newPassword ? `border-red-300` : `border-gray-200`}
                                        label={t('newPassword')}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        backgroundColor={'bg-gray-200'}
                                        rightIcon={show ? 'eye' : 'eye-slash'}
                                        placeholder={t('newPassword')}>
                                    </InputForm>
                                )}
                                name="newPassword"
                                defaultValue=""
                            />
                            {errors.newPassword && <Text style={tailwind(`font-poppins-500 text-red-400`)}>This is required.</Text>}
                        </View>
                        <View style={tailwind('px-4 mb-3')}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <InputForm
                                        iconChange={iconChangeNew}
                                        secureTextEntry={!showNew}
                                        borderColor={errors.passwordConfirm ? `border-red-300` : `border-gray-200`}
                                        label={t('passwordConfirm')}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        backgroundColor={'bg-gray-200'}
                                        rightIcon={showNew ? 'eye' : 'eye-slash'}
                                        placeholder={t('passwordConfirm')}>
                                    </InputForm>
                                )}
                                name="passwordConfirm"
                                defaultValue=""
                            />
                            {errors.passwordConfirm && <Text style={tailwind(`font-poppins-500 text-red-400`)}>This is required.</Text>}
                        </View>
                        <Gap size={'h-10'}></Gap>
                        <View style={tailwind('px-4 mb-3')}>
                            <ButtonForm onPress={handleSubmit(onSubmit)} buttonText={mounted ? 'Sending....' : t('send')}></ButtonForm>
                        </View>
                        <Gap size={'h-10'}></Gap>
                        <View style={tailwind('px-4 mb-3 flex-row justify-center')}>
                            <Text style={tailwind('font-poppins text-sm')}>{t('backTo')}</Text>
                            <TouchableOpacity onPress={gotoLogin}>
                                <Text style={tailwind(`text-sm pl-1 text-red-600 font-poppins-700`)}>{t('loginPage')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
                                <View style={tailwind('p-4 flex-row items-center')}>
                                    <TouchableOpacity onPress={toggleModal}>
                                        {
                                            isError ? <ErrorIcon height={tailwind('h-1/2').height}></ErrorIcon> : <FireworksIcon height={tailwind('h-1/2').height} />
                                        }

                                    </TouchableOpacity>
                                </View>
                                <Text style={tailwind('text-center font-poppins-600')}>{message}</Text>
                                <Gap size={'h-3'}></Gap>
                                <View></View>
                                <TouchableOpacity onPress={toggleModal} style={tailwind('w-1/2 h-10 bg-red-600 rounded justify-center items-center')}>
                                    <Text style={tailwind('text-white')}>{isError ? 'Close' : 'Loading....'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})
