import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IllustrationForgotPassword, TrueAnswerIcon } from '../../assets/icons';
import { ButtonForm, Gap, InputForm } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { resetPassword } from '../../services';
import { ErrorIcon, FireworksIcon } from '../../assets';

const index = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const { globalReducer } = useSelector(state => state);
    const { mounted, showModal, isError, message } = globalReducer;
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        dispatch({ type: 'SET_MOUNTED', value: { mounted: true } });
        let request = {
            email: data.email.toString().toLowerCase()
        }
        const response = await resetPassword(request);
        dispatch({ type: 'SHOW_MODAL', value: { showModal: !showModal } });
        if (response?.user) {
            dispatch({ type: 'SET_SUCCESS', value: { message: 'Request sent', isError: false } });
            setTimeout(() => {
                dispatch({ type: 'SHOW_MODAL', value: { showModal: false } });
                dispatch({ type: 'SET_SUCCESS', value: { message: '', isError: false } });
                navigation.navigate('Login', { screen: 'Login', params: { user: response.user } })
            }, 3000);
            dispatch({ type: 'SET_MOUNTED', value: { mounted: false } });
            return;
        }
        dispatch({ type: 'SET_ERROR', value: { message: 'Email not valid', isError: true } });
        dispatch({ type: 'SET_MOUNTED', value: { mounted: false } });

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
                            <Text style={tailwind(`font-poppins-600 text-xl`)}>{t('forgotPassword')}</Text>
                            <Text style={tailwind('text-sm w-3/4 text-gray-500')}>{t('forgotPasswordDecription')}</Text>
                        </View>
                        <Gap size={'h-10'}></Gap>
                        <View style={tailwind('px-4 mb-3')}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <InputForm
                                        keyboardType={'email-address'}
                                        borderColor={errors.email ? `border-red-300` : `border-gray-200`}
                                        rightIcon={value != '' && !errors.email && <TrueAnswerIcon></TrueAnswerIcon>}
                                        label={t('emailAddress')}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        backgroundColor={'bg-gray-200'}
                                        placeholder={t('emailAddress')}>
                                    </InputForm>
                                )}
                                name="email"
                                defaultValue=""
                            />
                            {errors.email && <Text style={tailwind('font-poppins text-red-500')}>This is required.</Text>}
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
