import React from 'react';
import { View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Text from '../../utils/Text';

export default function MapModal({ isMapModalVisible, setIsMapModalVisible }) {
    return (
        <MapView
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: Dimensions.get('window').height - 200,
            }}
        />
    );
}
