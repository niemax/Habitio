import React, { useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { SplashContainer } from '../utils/StyledComponents/Styled';
import { colors } from '../utils/colors';

export const Splash = () => (
    <View>
        <Image source={require('../assets/brand.png')} style={{ width: 300, height: 300 }} />
        <ActivityIndicator size="small" color={colors.mainGreen} style={{ marginTop: 70 }} />
    </View>
);

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Homepage');
        }, 2000);
    }, []);

    return (
        <SplashContainer>
            <Splash />
        </SplashContainer>
    );
}
