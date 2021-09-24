import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Homepage');
        }, 2000);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
            }}
        />
    );
}
