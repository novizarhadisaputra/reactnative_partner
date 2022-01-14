import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { GoogleIcon } from '../../assets/icons'
import { tailwind } from '../../extra/tailwind'

const index = ({ action = null, leftIcon, buttonText, ...props }) => {

    if (leftIcon != '' && leftIcon == 'google') {
        leftIcon = <View style={tailwind('pr-3')}><GoogleIcon></GoogleIcon></View>
    }
    return (
        <TouchableOpacity onPress={action} style={tailwind('w-full h-14 flex-row justify-center items-center rounded-xl border py-3')}>
            {leftIcon && leftIcon}
            <Text {...props} style={tailwind(`text-center text-black text-base font-poppins-500`)}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default index
