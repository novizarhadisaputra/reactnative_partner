import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon } from '../../assets/icons';
import { ButtonForm, Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';
import { acceptOrder, cancelOrder, finishOrder } from '../../services';

const detail = ({ navigation, route }) => {
    const transaction = route.params.transaction;
    const goBack = () => navigation.goBack();
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();

    const { globalReducer } = useSelector(state => state);
    const { isLoading } = globalReducer;

    const cancel = async (id) => {
        dispatch({ type: 'SET_LOADING', value: { isLoading: true } });
        const response = await cancelOrder(id);
        if (response?.transaction) {
            return goBack();
        }
    }

    const accept = async (id) => {
        dispatch({ type: 'SET_LOADING', value: { isLoading: true } });
        const response = await acceptOrder(id);
        if (response?.transaction) {
            return goBack();
        }
    }


    const finish = async (id) => {
        dispatch({ type: 'SET_LOADING', value: { isLoading: true } });
        const response = await finishOrder(id);
        if (response?.transaction) {
            return goBack();
        }
    }
    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center')}>
                    <TouchableOpacity onPress={goBack}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>
                    <Text style={tailwind(`font-poppins-600 pl-4 text-xl mr-3 text-black`)}>{t('eventDetail')}</Text>
                </View>
                <View style={tailwind('h-20 bg-on-going items-center justify-center')}>
                    <Text style={tailwind('font-poppins-400 text-sm color-on-going')}>{transaction.status.name}</Text>
                </View>
                <View style={tailwind('px-4 py-6')}>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-600 w-1/3 text-sm')}>{t('order')}</Text>
                        {/* <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{''}</Text> */}
                    </View>
                    <Gap size={'h-2'}></Gap>

                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('orderNumber')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{transaction.transaction_code}</Text>
                    </View>
                    <Gap size={'h-2'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('transactionDate')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{moment(transaction.created_at).format('D MMMM YYYY')}</Text>
                    </View>
                    <Gap size={'h-8'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-600 w-1/3 text-sm')}>{t('duration')}</Text>
                        {/* <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{''}</Text> */}
                    </View>
                    <Gap size={'h-2'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('eventDate')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{moment(transaction.details[0].schedule.date).format('D MMMM YYYY')}</Text>
                    </View>
                    <Gap size={'h-2'}></Gap>
                    <View style={tailwind('flex-row')}>
                        <Text style={tailwind('font-poppins-300 w-1/3 text-sm')}>{t('time')}</Text>
                        <Text style={tailwind('font-poppins-300 w-4 text-sm')}>{' : '}</Text>
                        <Text style={tailwind('font-poppins-300 text-sm')}>{`${transaction.details[0].schedule.time_start} - ${transaction.details[0].schedule.time_end}`}</Text>
                    </View>
                    <Gap size={'h-8'}></Gap>
                    <View>
                        <Text style={tailwind('font-poppins-600 text-base')}>{t('signLanguageInterpreter')}</Text>
                        <Gap size={'h-2'}></Gap>
                        <TouchableOpacity style={tailwind('shadow-card px-4 py-5 mb-3 bg-white rounded-2xl')}>
                            <View style={tailwind('flex-row justify-between')}>
                                <View style={tailwind('w-full flex-row items-center')}>
                                    <View style={tailwind('mr-3')}>
                                        <UserAvatar name={transaction.details[0].schedule.user.name} size={50} />
                                    </View>
                                    <View>
                                        <Text style={tailwind(`font-poppins-500 text-sm`)}>
                                            {transaction.details[0].schedule.user.name}
                                        </Text>
                                        <Text style={tailwind(`font-poppins-400 text-gray-500 text-xs opacity-60`)}>
                                            {`${transaction.details[0].schedule.user.detail.city ?? 'Indonesia'}, ${transaction.details[0].schedule.user.detail.province ?? 'Indonesia'}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Gap size={'h-8'}></Gap>
                    {
                        transaction.transaction_status_id == 2 && <View>
                            <ButtonForm buttonColor={'bg-red-500'} onPress={() => cancel(transaction.id)} buttonText={isLoading ? t('Loading....') : t('cancel')}></ButtonForm>
                            <Gap size={'h-3'}></Gap>
                            <ButtonForm buttonColor={'bg-blue-500'} onPress={() => accept(transaction.id)} buttonText={isLoading ? t('Loading....') : t('accept')}></ButtonForm>
                        </View>
                    }
                    {
                        transaction.transaction_status_id == 3 && <ButtonForm buttonColor={'bg-blue-500'} onPress={() => finish(transaction.id)} buttonText={isLoading ? t('Loading....') : t('finish')}></ButtonForm>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default detail

const styles = StyleSheet.create({})
