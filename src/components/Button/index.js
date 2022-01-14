import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { ChatIcon, GoogleIcon } from '../../assets/icons'
import { tailwind } from '../../extra/tailwind'

const index = ({ action = null, buttonColor, leftIcon, buttonText, ...props }) => {
    if (leftIcon != '' && leftIcon == 'google') {
        leftIcon = <View style={tailwind('pr-3')}><GoogleIcon></GoogleIcon></View>
    }
    if (leftIcon != '' && leftIcon == 'chat') {
        leftIcon = <View style={tailwind('pr-3')}><ChatIcon></ChatIcon></View>
    }

    let btnColor = buttonColor ?? 'bg-red-600';
    return (
        <TouchableOpacity onPress={action} {...props} style={tailwind(`w-full h-14 flex-row justify-center items-center ${btnColor} rounded-xl py-3`)}>
            {leftIcon && leftIcon}
            <Text {...props} style={tailwind('text-center font-poppins-600 text-white text-sm font-bold')}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default index
