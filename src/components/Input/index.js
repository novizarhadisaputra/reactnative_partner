import React from 'react'
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { EmailIcon, EyeIcon, EyeSlashIcon, KeyIcon, TrueAnswerIcon } from '../../assets/icons'
import { tailwind } from '../../extra/tailwind'

const index = ({ iconChange, backgroundColor, borderColor = 'border-gray-200', label, placeholder, rightIcon, ...props }) => {
    // Right Icon 
    if (rightIcon != '' && rightIcon == 'email') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12')}><EmailIcon></EmailIcon></TouchableOpacity>;
    } else if (rightIcon != '' && rightIcon == 'key') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12')}><KeyIcon></KeyIcon></TouchableOpacity>;
    } else if (rightIcon != '' && rightIcon == 'eye') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12 items-center')}><EyeIcon></EyeIcon></TouchableOpacity>;
    }else if (rightIcon != '' && rightIcon == 'eye-slash') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12 items-center')}><EyeSlashIcon></EyeSlashIcon></TouchableOpacity>;
    } else if (rightIcon != '' && rightIcon == 'true-answer') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12 items-center')}><TrueAnswerIcon></TrueAnswerIcon></TouchableOpacity>
    }
    
    return (
        <View>
            <Text style={tailwind(`font-poppins-400 text-sm mb-2`)}>{label}</Text>
            <View style={tailwind(`py-3 px-3 w-full border ${borderColor} rounded-md ${backgroundColor}`)}>
                <View style={tailwind('w-full flex flex-row items-center')}>
                    <TextInput {...props} style={tailwind(`h-6 py-0 justify-center font-poppins-400 text-sm px-3 w-11/12`)} placeholder={placeholder}></TextInput>
                    {rightIcon && rightIcon}
                </View>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
