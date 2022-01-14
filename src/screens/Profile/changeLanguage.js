import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon, RadioButtonIcon, RadioButtonActiveIcon } from '../../assets/icons';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';

const index = ({ navigation }) => {
    const goBack = () => navigation.goBack();
    const { t, i18n } = useTranslation();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const { language } = state.globalReducer;
    const arrLanguage = [
        { label: 'Bahasa Indonesia', code: 'id' }, 
        { label: 'English', code: 'en' }
    ];
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        dispatch({ type: 'SET_LANGUAGE', value: { language: language } });
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
                    <Text style={tailwind(`font-poppins-600 pl-4 text-xl mr-3 text-black`)}>{t('selectLanguage')}</Text>
                </View>
                <Gap size={'h-5'}></Gap>
                <View style={tailwind('bg-white h-1/6 p-4 justify-center')}>
                    {
                        arrLanguage.map((l, i) => {
                            return (<View key={i} style={tailwind('py-2 mb-3 border-0 color-line-border border-b flex-row justify-between items-center')}>
                                <Text style={tailwind('items-center pl-2 font-poppins-400')}>{l.label}</Text>
                                <TouchableOpacity>
                                    {
                                        language == l.code ?
                                            <RadioButtonActiveIcon /> :
                                            <TouchableOpacity onPress={() => changeLanguage(l.code)}><RadioButtonIcon /></TouchableOpacity>
                                    }

                                </TouchableOpacity>
                            </View>)
                        })
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({})
