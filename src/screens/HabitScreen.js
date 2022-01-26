import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Box, Center, Flex, Text, HStack, useColorModeValue } from 'native-base';
import {
    ChevronTextContainer,
    HabitCardsContainer,
    HabitScreenContainer,
    HabitTextColumnContainer,
    ImageContainer,
} from '../utils/StyledComponents/Styled';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const HabitScreen = ({ route, navigation }) => {
    const { habitData, image, category } = route.params;

    return (
        <Box flex={1} bg={useColorModeValue(colors.white, colors.mainBackground)} align="center">
            <ImageContainer style={{ backgroundColor: useColorModeValue('white', colors.black) }}>
                <ChevronTextContainer>
                    <Text fontWeight={800} fontSize="3xl" marginLeft="10px" marginTop="20px">
                        {category}
                    </Text>
                </ChevronTextContainer>
                <Image style={{ height: 100, width: 100 }} source={image} />
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
                        <Flex direction="row" align="center" ml={2}>
                            <Center
                                bg={useColorModeValue('white', 'gray.800')}
                                p={2}
                                rounded="lg"
                                align="center"
                                mr={2}
                            >
                                <Image style={{ height: 20, width: 20 }} source={habitIcon} />
                            </Center>
                            <HabitTextColumnContainer>
                                <Text fontWeight={500} fontSize="md" marginLeft="5px">
                                    {name}
                                </Text>
                                <Text fontWeight={400} fontSize="sm" opacity={0.8} marginLeft="5px">
                                    {description}
                                </Text>
                            </HabitTextColumnContainer>
                        </Flex>
                        <Box>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </Box>
                    </HabitCardsContainer>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            opacity: 0.1,
                            marginTop: 13,
                        }}
                    />
                </TouchableOpacity>
            ))}
        </Box>
    );
};

export default HabitScreen;
