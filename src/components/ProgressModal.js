import React from 'react';
import { View, StyleSheet, Modal, Alert, Image } from 'react-native';
import Text from '../utils/Text';
import { colors } from '../utils/colors';
import {
    ProgressModalCentered,
    ProgressModalCloseButton,
    ProgressModalShareButton,
    ProgressModalView,
} from '../utils/StyledComponents/Styled';

export default function ProgressModal({ progressModalVisible, setProgressModalVisible, data }) {
    const { name, completedDates } = data;
    return (
        <ProgressModalCentered>
            <Modal animationType="slide" transparent={true} visible={progressModalVisible}>
                <ProgressModalCentered>
                    <ProgressModalView>
                        <Image
                            source={require('../assets/flatIcons/medal.png')}
                            style={{ height: 140, width: 140, marginBottom: 20 }}
                        />
                        <Text fontFamily="Bold" twentyEight>
                            Wow. Good job{' '}
                            <Text color="gold" fontFamily="Extra" twentyEight>
                                Champ!
                            </Text>
                        </Text>
                        <Text marginTop="50px" fontFamily="Bold" nineteen>
                            {name} completed{'\n'}
                            <Text color="gold" fontFamily="Extra" twentyEight>
                                {Object.keys(completedDates).length} times!
                            </Text>
                        </Text>
                        <Text marginTop="50px" fontFamily="Medium" sixteen>
                            Aim for the{' '}
                            <Text fontFamily="Bold" nineteen color="#0FCBFA">
                                skies!
                            </Text>
                        </Text>
                        <ProgressModalShareButton>
                            <Text fontFamily="SemiBold" twenty>
                                Share
                            </Text>
                        </ProgressModalShareButton>
                        <ProgressModalCloseButton onPress={() => setProgressModalVisible(false)}>
                            <Text fontFamily="SemiBold" twenty>
                                Sweet!
                            </Text>
                        </ProgressModalCloseButton>
                    </ProgressModalView>
                </ProgressModalCentered>
            </Modal>
        </ProgressModalCentered>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.mainBackground,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
