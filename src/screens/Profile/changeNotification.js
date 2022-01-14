import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon, NotificationBlackIcon } from '../../assets/icons';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';

const index = ({ navigation }) => {
    const goBack = () => navigation.goBack();
    const { t, i18n } = useTranslation();
    const state = useSelector(state => state);
    const { isActiveNotification } = state.globalReducer;
    const dispatch = useDispatch();
    const toggleSwitch = () => dispatch({ type: 'TOGGLE_NOTIFICATION', value: { isActiveNotification: !isActiveNotification } });
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center')}>
                    <TouchableOpacity onPress={goBack}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>
                    <Text style={tailwind(`font-poppins-600 pl-4 text-xl mr-3 text-black`)}>{t('notification')}</Text>
                </View>
                <Gap size={'h-5'}></Gap>
                <View style={tailwind('h-1/6 px-4')}>
                    <View style={tailwind('flex-row justify-between items-start')}>
                        <View style={tailwind('flex-row w-9/12')}>
                            <NotificationBlackIcon width={tailwind('h-6').height} height={tailwind('h-6').height} />
                            <View style={tailwind('px-4')}>
                                <Text style={tailwind('font-poppins-500 text-base')}>{t('updateInformation')}</Text>
                                <Text style={tailwind('mt-2 font-poppins-400 text-xs opacity-60')}>{t('updateInformationDescription')}</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FF3B3052" }}
                            thumbColor={isActiveNotification ? "#FF3B30" : "#f4f3f4"}
                            ios_backgroundColor="#D3EBE4"
                            onValueChange={toggleSwitch}
                            value={isActiveNotification}
                        />
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({})
