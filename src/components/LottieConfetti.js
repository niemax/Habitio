import React from 'react';
import LottieView from 'lottie-react-native';

export default function LottieConfetti({ ref }) {
    return (
        <LottieView
            style={{ marginBottom: 250 }}
            ref={ref}
            source={require('../assets/lottiejson/lf30_editor_oxsrznpw.json')}
        />
    );
}
