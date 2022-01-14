import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from '../../extra/tailwind'

const index = ({ size }) => {
    return (
        <View style={tailwind(`${size}`)} />
    )
}

export default index
