import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
    ChevronTextContainer,
    HabitScreenContainer,
    ImageContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';

const HabitScreen = ({ route, navigation }) => {
    const { name, image } = route.params;
    return (
        <HabitScreenContainer>
            <ImageContainer>
                <ChevronTextContainer>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={32} color="white" />
                    </TouchableOpacity>

                    <Text left fontFamily="Bold" thirtyFour marginLeft="10px" marginTop="20px">
                        {name}
                    </Text>
                </ChevronTextContainer>
                <Image
                    style={{ height: 90, width: 90, marginRight: 20, marginTop: 20 }}
                    source={image}
                />
            </ImageContainer>
        </HabitScreenContainer>
    );
};

export default HabitScreen;
