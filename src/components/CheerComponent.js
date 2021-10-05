import AnimatedLottieView from 'lottie-react-native';
import React from 'react';

export default function CheerComponent({ ref }) {
    return (
        <AnimatedLottieView
            style={{ marginBottom: 250 }}
            ref={animation}
            source={require('../assets/lottiejson/lf30_editor_oxsrznpw.json')}
        />
    );
}
