import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ArrowDownIcon, EmailIcon, EyeIcon, EyeSlashIcon, KeyIcon, TrueAnswerIcon } from '../../assets/icons';
import { tailwind } from '../../extra/tailwind';

const index = ({ action, defaultButtonText = 'select', data, iconChange, backgroundColor = '', borderColor = 'border-green-400', label, placeholder, rightIcon, ...props }) => {
    // Right Icon 
    if (rightIcon != '' && rightIcon == 'email') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12')}><EmailIcon></EmailIcon></TouchableOpacity>;
    } else if (rightIcon != '' && rightIcon == 'key') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12')}><KeyIcon></KeyIcon></TouchableOpacity>;
    } else if (rightIcon != '' && rightIcon == 'eye') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12 items-center')}><EyeIcon></EyeIcon></TouchableOpacity>;
    } else if (rightIcon != '' && rightIcon == 'eye-slash') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12 items-center')}><EyeSlashIcon></EyeSlashIcon></TouchableOpacity>;
    } else if (rightIcon != '' && rightIcon == 'true-answer') {
        rightIcon = <TouchableOpacity onPress={iconChange} style={tailwind('w-1/12 items-center')}><TrueAnswerIcon></TrueAnswerIcon></TouchableOpacity>
    }
    
    const { t, i18n } = useTranslation();
    return (
        <View>
            <Text style={tailwind(`font-poppins-400 opacity-70`)}>{label}</Text>
            <View style={tailwind('w-full flex flex-row pt-2 items-center')}>
                <SelectDropdown
                    data={data}
                    buttonStyle={tailwind(`w-full h-10 border ${backgroundColor} ${borderColor} rounded-xl`)}
                    buttonTextStyle={tailwind('text-green-400')}
                    onSelect={(selectedItem, index) => {
                        return action ? action(selectedItem) : selectedItem
                    }}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={tailwind('flex-row w-2/3 justify-between items-center')}>
                                {
                                    !selectedItem && rightIcon
                                }
                                <Text style={tailwind(`font-poppins-400`)}>
                                    {selectedItem ? selectedItem : t(defaultButtonText)}
                                </Text>
                            </View>
                        );
                    }}
                    defaultButtonText={t(defaultButtonText)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={() => {
                        return (
                            <ArrowDownIcon></ArrowDownIcon>
                        );
                    }}
                    dropdownIconPosition={"right"}
                />
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
