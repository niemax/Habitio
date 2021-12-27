import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
    ChevronTextContainer,
    HabitCardsContainer,
    HabitScreenContainer,
    HabitTextColumnContainer,
    ImageContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';

const HabitScreen = ({ route, navigation }) => {
    const { habitData, habitName, image } = route.params;

    return (
        <HabitScreenContainer>
            <ImageContainer>
                <ChevronTextContainer>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={32} color="white" />
                    </TouchableOpacity>

                    <Text left fontFamily="Extra" thirtyFour marginLeft="10px" marginTop="20px">
                        {habitName}
                    </Text>
                </ChevronTextContainer>
                <Image
                    style={{ height: 100, width: 100, marginRight: 20, marginTop: 20 }}
                    source={image}
                />
            </ImageContainer>
            {habitData.map(({ habitIcon, name, data, description, color }) => (
                <TouchableOpacity
                    key={name}
                    onPress={() =>
                        navigation.push('CreateHabit', {
                            habitIcon: habitIcon,
                            habitName: name,
                            color: color,
                            ...data,
                        })
                    }
                >
                    <HabitCardsContainer key={index.toString()}>
                        <Image
                            style={{ height: 40, width: 40, marginLeft: 15 }}
                            source={habitIcon}
                        />
                        <HabitTextColumnContainer>
                            <Text left marginLeft="15px" fontFamily="Medium">
                                {name}
                            </Text>
                            <Text
                                left
                                marginLeft="15px"
                                marginTop="3px"
                                fontFamily="Regular"
                                sixteen
                                color="gray"
                            >
                                {description}
                            </Text>
                        </HabitTextColumnContainer>
                    </HabitCardsContainer>
                </TouchableOpacity>
            ))}
        </HabitScreenContainer>
    );
};

export default HabitScreen;
