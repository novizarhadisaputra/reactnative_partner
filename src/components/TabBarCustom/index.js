import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FileActiveIcon, FileIcon, HistoryActiveIcon, HistoryIcon, HomeActiveIcon, HomeIcon, ProfileIcon, SearchActiveIcon, SearchIcon } from '../../assets/icons';
import { tailwind } from '../../extra/tailwind';


const index = ({ state, descriptors, navigation }) => {
    return (
        <SafeAreaView>
            <View style={tailwind('flex-row w-full justify-between px-10 bg-white h-16 items-center')}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    let icon = null;
                    switch (label) {
                        case 'Home':
                            icon = isFocused ? <HomeActiveIcon></HomeActiveIcon> : <HomeIcon></HomeIcon>;
                            break;
                        case 'Search':
                            icon = isFocused ? <FileActiveIcon></FileActiveIcon> : <FileIcon></FileIcon>;
                            break;
                        case 'History':
                            icon = isFocused ? <HistoryActiveIcon></HistoryActiveIcon> : <HistoryIcon></HistoryIcon>;
                            break;
                        case 'Profile':
                            icon = <ProfileIcon></ProfileIcon>;
                            break;
                        default:
                            break;
                    }
                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}

                        >
                            {icon}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

export default index