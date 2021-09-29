import React, { useEffect, useState } from 'react';
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
import data from '../categories';
import { habitBoxShadow } from '../utils/globalStyles';

const HabitScreen = ({ route, navigation }) => {
    const { habitName, image } = route.params;

    return (
        <HabitScreenContainer>
            <ImageContainer>
                <ChevronTextContainer>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={32} color="white" />
                    </TouchableOpacity>

                    <Text left fontFamily="Bold" thirtyFour marginLeft="10px" marginTop="20px">
                        {habitName}
                    </Text>
                </ChevronTextContainer>
                <Image
                    style={{ height: 90, width: 90, marginRight: 20, marginTop: 20 }}
                    source={image}
                />
            </ImageContainer>
            {data.map((item) => {
                return item.habits.map(({ habitIcon, name, description }, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() =>
                            navigation.push('CreateHabit', {
                                habitIcon: habitIcon,
                                habitName: name,
                                ...data,
                            })
                        }
                    >
                        <HabitCardsContainer key={idx} style={habitBoxShadow}>
                            <Image
                                style={{ height: 45, width: 45, marginLeft: 15 }}
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
                                >
                                    {description}
                                </Text>
                            </HabitTextColumnContainer>
                        </HabitCardsContainer>
                    </TouchableOpacity>
                ));
            })}
        </HabitScreenContainer>
    );
};

export default HabitScreen;
