import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { ClockIcon } from '../../assets/icons';
import { tailwind } from '../../extra/tailwind';

const index = () => {
    
    return (
        <SafeAreaView>
            {/* <View style={tailwind('')}>
                <View style={tailwind('bg-red-500 h-1/2 w-full')} />
                <View style={tailwind('absolute p-4 w-full bottom-0 h-1/2 rounded-t-3xl bg-white')}>
                    <View style={tailwind('flex-row mb-1')}>
                        <View style={tailwind('mr-1')}>
                            <ClockIcon></ClockIcon>
                        </View>
                        <Text style={tailwind(`${fontRegular} text-gray-500 text-xs opacity-60`)}>{'24-07-2021  15.48'}</Text>
                    </View>
                </View>
            </View> */}
        </SafeAreaView>
    )
}

export default index
