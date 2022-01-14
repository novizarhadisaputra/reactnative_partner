import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FireworksIcon, TrueAnswerIcon } from '../../assets/icons';
import { ButtonForm, Gap, InputForm } from '../../components';
import { baseUrl } from '../../config';
import { tailwind } from '../../extra/tailwind';

const index = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const [show, setshow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const onSubmit = async (data) => {
        let request = {
            name: data.name,
            email: data.email.toString().toLowerCase(),
            password: data.password,
            phone: data.phoneNumber,
            role_id: 3
        }
        const response = await axios.post(`${baseUrl}/api/auth/registration`, request)
            .then(res => res.data.data)
            .catch(e => console.log(`e`, e.response.data));
        setModalVisible(!modalVisible)

        // if (response) {
        //     await AsyncStorage.setItem('userToken', response.token.access_token);
        //     navigation.navigate('Home');
        // }
    }

    const gotoLogin = () => { 
        setModalVisible(false);
        navigation.navigate('Login') 
    };
    const iconChange = () => setshow(!show);
    const toggleModal = () => setModalVisible(!modalVisible);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView>
                <View style={tailwind('h-full w-full justify-center')}>
                    <Text style={tailwind(`font-poppins-700 text-xl text-center text-red-600`)}>{t('createNewAccount')}</Text>
                    <Gap size={'h-16'}></Gap>
                    <View style={tailwind('px-4 mb-3')}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputForm
                                    borderColor={errors.name ? `border-red-300` : `border-gray-200`}
                                    rightIcon={value != '' && !errors.name && <TrueAnswerIcon></TrueAnswerIcon>}
                                    label={t('fullName')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    backgroundColor={'bg-gray-200'}
                                    placeholder={t('fullName')}>
                                </InputForm>
                            )}
                            name="name"
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
                    <View style={tailwind('px-4 mb-3')}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputForm
                                    keyboardType={'number-pad'}
                                    borderColor={errors.phoneNumber ? `border-red-300` : `border-gray-200`}
                                    label={t('phoneNumber')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    backgroundColor={'bg-gray-200'}
                                    placeholder={t('phoneNumber')}>
                                </InputForm>
                            )}
                            name="phoneNumber"
                            defaultValue=""
                        />
                        {errors.password && <Text style={tailwind(`font-poppins-500 text-red-400`)}>This is required.</Text>}
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
                    <Gap size={'h-10'}></Gap>
                    <View style={tailwind('px-4 mb-3')}>
                        <ButtonForm onPress={handleSubmit(onSubmit)} buttonText={t('signup')}></ButtonForm>
                    </View>
                    <Gap size={'h-10'}></Gap>
                    <View style={tailwind('px-4 mb-3 flex-row justify-center')}>
                        <Text style={tailwind('font-poppins text-sm')}>{t('haveAccount')}</Text>
                        <TouchableOpacity onPress={gotoLogin}>
                            <Text style={tailwind(`text-sm pl-1 text-red-600 font-poppins-700`)}>{t('login')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={tailwind('flex-1')}>
                            <View style={tailwind('h-full w-full justify-center items-center')}>
                                <View style={tailwind('absolute h-full w-full bg-gray-800 opacity-40')}></View>
                                <View style={tailwind('bg-white rounded-3xl w-4/5 h-2/5 items-center')}>
                                    <View style={tailwind('p-4 flex-row items-center')}>
                                        <TouchableOpacity onPress={toggleModal}>
                                            <FireworksIcon height={tailwind('h-1/2').height}></FireworksIcon>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={tailwind('text-center font-poppins-600')}>{'Registrasi Berhasil'}</Text>
                                    <Gap size={'h-3'}></Gap>
                                    <View></View>
                                    <TouchableOpacity onPress={gotoLogin} style={tailwind('w-1/2 h-10 bg-red-600 rounded justify-center items-center')}>
                                        <Text style={tailwind('text-white')}>{t('nextToLogin')}</Text>
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
