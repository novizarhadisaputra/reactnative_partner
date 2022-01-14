import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon, TimeCircleGreenIcon, TimeCircleRedIcon } from '../../assets';
import { Gap } from '../../components';
import { tailwind } from '../../extra/tailwind';


const changeValueField = ({ navigation, route }) => {
    const state = useSelector(state => state);
    const { start, end } = state.scheduleReducer;

    const { control, handleSubmit, formState: { errors } } = useForm();
    const field = route.params.field
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const goBack = () => {
        navigation.goBack()
    };
    const onSubmit = async (data) => {
        let start_tmp = (Array.from(state.scheduleReducer[`start-${capitalize(field)}`]));
        start_tmp.push(data.time_start);
        let end_tmp = Array.from(state.scheduleReducer[`end-${capitalize(field)}`]);
        end_tmp.push(data.time_end)
        let price_tmp = Array.from(state.scheduleReducer[`end-${capitalize(field)}`]);
        price_tmp.push(data.price)
        
        let type = `SET_${field.toUpperCase()}`
        let value = {};
        value[`start-${capitalize(field)}`] = start_tmp;
        value[`end-${capitalize(field)}`] = end_tmp;
        value[`price-${capitalize(field)}`] = price_tmp;
        dispatch({ type: type, value });
        goBack();
    }

    // useEffect(() => {
    //     return () => {

    //     }
    // }, [tmpUser])

    return (
        <SafeAreaView>
            <View style={tailwind('w-full h-full bg-gray-100')}>
                <View style={tailwind('flex-row px-4 py-2 bg-white items-center')}>
                    <TouchableOpacity onPress={goBack}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>
                    <Text style={tailwind(`font-poppins-600 pl-4 text-xl mr-3 text-black`)}>{field}</Text>
                </View>
                <Gap size={'h-8'} />
                <View style={tailwind('justify-center items-center px-4')}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                                <View style={tailwind('w-4')}>
                                    <TimeCircleGreenIcon />
                                </View>
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value} style={tailwind('pl-4 w-11/12 font-poppins-400 text-sm')}></TextInput>
                            </View>
                        )}
                        name={'time_start'}
                        defaultValue={'08:00'}
                    />
                    <Gap size={'h-3'} />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                                <View style={tailwind('w-4')}>
                                    <TimeCircleRedIcon />
                                </View>
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value} style={tailwind('pl-4 w-11/12 font-poppins-400 text-sm')}></TextInput>
                            </View>
                        )}
                        name={'time_end'}
                        defaultValue={'09:00'}
                    />
                    <Gap size={'h-3'} />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={tailwind('flex-row border border-gray-500 h-14 items-center px-4 bg-gray-200 rounded-lg w-full')}>
                                <View style={tailwind('w-4')}>
                                    <TimeCircleRedIcon />
                                </View>
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value} style={tailwind('pl-4 w-11/12 font-poppins-400 text-sm')}></TextInput>
                            </View>
                        )}
                        name={'price'}
                        defaultValue={'100000'}
                    />
                    <Gap size={'h-10'} />
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tailwind('flex-row w-full justify-center items-center bg-red-600 h-14 rounded-lg')}>
                        <Text style={tailwind('text-base font-poppins-600 text-white')}>{'Simpan'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default changeValueField

const styles = StyleSheet.create({})
