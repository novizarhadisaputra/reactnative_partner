import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorIcon } from '../../assets/icons';
import { ButtonForm, Gap, InputForm } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { login, loginThirdParty, registration } from '../../services';

const index = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { globalReducer } = useSelector(state => state);
    const { isLoading, hasSubmit } = globalReducer;
    const [show, setshow] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const state = useSelector(state => state);
    const { user } = state.profileReducer;
    const { mounted, showModal } = state.globalReducer;
    const onSubmit = async (data) => {
        let request = {
            email: data.email.toString().toLowerCase(),
            password: data.password
        }
        dispatch({ type: 'SET_LOADING', value: { isLoading: true } });

        const response = await login(request)
        if (response?.token) {
            await AsyncStorage.setItem('userToken', response.token.access_token);
            dispatch({ type: 'SET_LOADING', value: { isLoading: false } });
            dispatch({ type: 'SET_HAS_LOGIN', value: { hasLogin: true } });
            dispatch({ type: 'SET_HAS_SUBMIT', value: { hasSubmit: true } });
            dispatch({ type: 'SET_USER', value: { user: response.user } });
                
            return navigation.replace('Tabs');
        }
        dispatch({ type: 'SET_LOADING', value: { isLoading: false } });
        dispatch({ type: 'SHOW_MODAL', value: { showModal: true } });
    }

    const signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken, user } = await GoogleSignin.signIn();
            const request = {
                email: user.email,
                name: user.name,
                password: 'signteraktif2021',
                role_id: 3,
                is_active: 1
            }
            await registration(request)
            const response = await loginThirdParty(request);
            if (response?.token) {
                await AsyncStorage.setItem('userToken', response.token.access_token);
                dispatch({ type: 'SET_LOADING', value: { isLoading: false } });
                dispatch({ type: 'SET_HAS_LOGIN', value: { hasLogin: true } });
                dispatch({ type: 'SET_HAS_SUBMIT', value: { hasSubmit: true } });
                dispatch({ type: 'SET_USER', value: { user: response.user } });
                return navigation.navigate('Tabs');
            }
        } catch (error) {
            console.log(`error`, error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const gotoRegister = () => navigation.navigate('Registration');
    const gotoForgot = () => navigation.navigate('Forgot');
    const iconChange = () => setshow(!show);
    const closeModal = () => dispatch({ type: 'SHOW_MODAL', value: { showModal: false } });

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '906939148059-8m2iuvehp95orbba33ed9ktv8nrj7q21.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView>
                <View style={tailwind('h-full w-full justify-center')}>
                    <View style={tailwind('px-4')}>
                        <Text style={tailwind(`font-poppins-600 text-2xl w-3/4 text-left text-red-600`)}>{t('comeJoinJbi')}</Text>
                    </View>
                    <Gap size={'h-16'}></Gap>
                    <View style={tailwind('px-4 mb-3')}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputForm
                                    borderColor={errors.email ? `border-red-300` : `border-gray-200`}
                                    rightIcon={hasSubmit && 'true-answer'}
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
                    <View style={tailwind('px-4 mb-3')}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputForm
                                    iconChange={iconChange}
                                    secureTextEntry={!show}
                                    borderColor={errors.password ? `border-red-300` : `border-gray-200`}
                                    label={t('password')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    backgroundColor={'bg-gray-200'}
                                    rightIcon={show ? 'eye' : 'eye-slash'}
                                    placeholder={t('password')}>
                                </InputForm>
                            )}
                            name="password"
                            defaultValue=""
                        />
                        {errors.password && <Text style={tailwind(`font-poppins-500 text-red-400`)}>This is required.</Text>}
                    </View>
                    <TouchableOpacity onPress={gotoForgot} style={tailwind('px-4 mb-3 items-end')}>
                        <Text style={tailwind(`font-poppins-500 text-sm`)}>{t('forgotPassword')}</Text>
                    </TouchableOpacity>
                    <Gap size={'h-10'}></Gap>
                    <View style={tailwind('px-4 mb-3')}>
                        <ButtonForm onPress={handleSubmit(onSubmit)} buttonText={isLoading ? t('Loading....') : t('login')}></ButtonForm>
                    </View>
                    {/* <TouchableOpacity style={tailwind('px-4 mb-3')}>
                        <ButtonVendor action={signInGoogle} leftIcon={'google'} buttonText={t('Login with Google')}></ButtonVendor>
                    </TouchableOpacity> */}
                    <Gap size={'h-10'}></Gap>
                    <View style={tailwind('px-4 mb-3 flex-row justify-center')}>
                        <Text style={tailwind('font-poppins text-sm')}>{t('haveAccount')}</Text>
                        <TouchableOpacity onPress={gotoRegister}>
                            <Text style={tailwind(`text-sm pl-1 text-red-600 font-poppins-700`)}>{t('signup')}</Text>
                        </TouchableOpacity>
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
                                        <TouchableOpacity onPress={closeModal}>
                                            <ErrorIcon height={tailwind('h-1/2').height}></ErrorIcon>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={tailwind('text-center font-poppins-600')}>{'Email and Password not match'}</Text>
                                    <Gap size={'h-3'}></Gap>
                                    <View></View>
                                    <TouchableOpacity onPress={closeModal} style={tailwind('w-1/2 h-10 bg-red-600 rounded justify-center items-center')}>
                                        <Text style={tailwind('text-white')}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})
