import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Box, Center, HStack } from 'native-base';
import {
    ChevronTextContainer,
    HabitCardsContainer,
    HabitScreenContainer,
    HabitTextColumnContainer,
    ImageContainer,
} from '../utils/StyledComponents/Styled';
import { Ionicons } from '@expo/vector-icons';
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
                        <HStack>
                            <Center bg="gray.800" h={10} p={2} rounded="lg" align="center" mr={2}>
                                <Image style={{ height: 25, width: 25 }} source={habitIcon} />
                            </Center>
                            <HabitTextColumnContainer>
                                <Text left marginLeft="5px" fontFamily="Medium">
                                    {name}
                                </Text>
                                <Text
                                    left
                                    marginLeft="5px"
                                    fontFamily="Regular"
                                    sixteen
                                    color="gray"
                                >
                                    {description}
                                </Text>
                            </HabitTextColumnContainer>
                        </HStack>
                        <Box>
                            <Ionicons name="chevron-forward" size={24} color="white" />
                        </Box>
                    </HabitCardsContainer>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            opacity: 0.1,
                            marginTop: 10,
                        }}
                    />
                </TouchableOpacity>
            ))}
        </HabitScreenContainer>
    );
};

export default HabitScreen;
