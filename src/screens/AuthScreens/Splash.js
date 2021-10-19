import React, { useEffect } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { SplashContainer } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';

export const SplashLottie = () => {
    return (
        <>
            <Image source={require('../../assets/brand.png')} style={{ width: 300, height: 300 }} />
            <ActivityIndicator size="small" color={colors.mainGreen} style={{ marginTop: 70 }} />
        </>
    );
};

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('MainTab');
        }, 2000);
    }, []);

    return (
        <SplashContainer>
            <SplashLottie />
        </SplashContainer>
    );
}
