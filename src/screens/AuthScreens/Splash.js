import React, { useEffect, useRef } from 'react';
import { Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { SplashContainer } from '../../utils/StyledComponents/Styled';

export const SplashLottie = () => {
    const animation = useRef(null);

    useEffect(() => {
        animation.current.play();
    });

    return (
        <>
            <Image source={require('../../assets/brand.png')} style={{ width: 300, height: 300 }} />
            <LottieView
                style={{ marginTop: 170 }}
                ref={animation}
                source={require('../../assets/lottiejson/lf30_editor_x5egq6qs.json')}
            />
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
