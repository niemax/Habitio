import React from 'react';
import { Modal, Image } from 'react-native';
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
            <Modal animationType="fade" transparent={true} visible={progressModalVisible}>
                <ProgressModalCentered>
                    <ProgressModalView>
                        <Image
                            source={require('../assets/flatIcons/medal.png')}
                            style={{ height: 140, width: 140, marginBottom: 20 }}
                        />
                        <Text fontFamily="Bold" twentyEight>
                            Good job,{' '}
                            <Text color="gold" fontFamily="Extra" twentyEight>
                                Champ!
                            </Text>
                        </Text>
                        <Text marginTop="50px" fontFamily="Bold" nineteen>
                            {name} completed{'\n'}
                            <Text color="gold" fontFamily="Extra" twentyEight>
                                {Object.keys(completedDates).length} times
                            </Text>
                        </Text>
                        <Text fontFamily="Extra" marginTop="50px" nineteen color="gold">
                            Only sky{' '}
                            <Text fontFamily="Medium" sixteen>
                                is the limit!
                            </Text>
                        </Text>
                        <ProgressModalShareButton>
                            <Text fontFamily="SemiBold" twenty color={colors.mainGreen}>
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
