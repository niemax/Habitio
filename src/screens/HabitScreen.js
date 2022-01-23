import { Center } from 'native-base';
import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    ChevronTextContainer,
    HabitCardsContainer,
    HabitScreenContainer,
    HabitTextColumnContainer,
    ImageContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';

const HabitScreen = ({ route, navigation }) => {
    const { habitData, image, category } = route.params;

    return (
        <HabitScreenContainer>
            <ImageContainer>
                <ChevronTextContainer>
                    <Text left fontFamily="Extra" thirtyFour marginLeft="10px" marginTop="20px">
                        {category}
                    </Text>
                </ChevronTextContainer>
                <Image
                    style={{ height: 100, width: 100, marginRight: 20, marginTop: 20 }}
                    source={image}
                />
            </ImageContainer>
            {habitData.map(({ habitIcon, description, color, name }) => (
                <TouchableOpacity
                    key={name}
                    onPress={() =>
                        navigation.push('CreateHabit', {
                            habitIcon: habitIcon,
                            name: name,
                            color: color,
                        })
                    }
                >
                    <HabitCardsContainer>
                        <Center bg="gray.800" p={2} rounded="lg" align="center" ml={2}>
                            <Image style={{ height: 30, width: 30 }} source={habitIcon} />
                        </Center>
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
