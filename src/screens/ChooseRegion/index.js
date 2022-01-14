import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch } from 'react-redux';
import { ArrowDownIcon, GlobeIcon } from '../../assets/icons';
import { tailwind } from '../../extra/tailwind';


const index = ({ navigation, route }) => {
    const countries = ["English", "Bahasa Indonesia"];
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    
    const changeLanguage = async (lang) => {
        i18n.changeLanguage(lang);
        dispatch({ type: 'SET_LANGUAGE', value: { language: lang } });
        navigation.navigate('Login');
    }
    const fontMedium = Platform.OS === 'android' ? `font-poppins-medium` : 'font-poppins font-medium'; // 500

    return (
        <SafeAreaView>
            <View style={tailwind('h-full bg-gray-200 justify-center items-center')}>
                <SelectDropdown
                    data={countries}
                    buttonStyle={tailwind('w-3/4 border border-red-400 py-3 rounded-md')}
                    buttonTextStyle={tailwind('text-red-400')}
                    onSelect={(selectedItem, index) => {
                        switch (selectedItem) {
                            case "English":
                                return changeLanguage('en')
                            case "Bahasa Indonesia":
                                return changeLanguage('id')
                            default:
                                return changeLanguage('id')
                        }
                    }}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={tailwind('flex-row w-2/3 justify-between items-center')}>
                                {
                                    !selectedItem && <GlobeIcon></GlobeIcon>
                                }
                                <Text style={tailwind(fontMedium)}>
                                    {selectedItem ? selectedItem : t("selectLanguage")}
                                </Text>
                            </View>
                        );
                    }}
                    defaultButtonText={t("selectLanguage")}
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
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({})
