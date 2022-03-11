import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Box, Center, Flex, Text, useColorModeValue, VStack } from 'native-base';
import { ChevronTextContainer, ImageContainer } from '../utils/StyledComponents/Styled';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MainContainer from '../components/uiComponents/MainContainer';
import useSettings from '../hooks/useSettings';
import ListContainer from '../components/uiComponents/ListContainer';

const HabitScreen = ({ route, navigation }) => {
    const { habitData, image, category } = route.params;
    const { navigate } = navigation;

    const { colors } = useSettings();

    return (
        <MainContainer>
            <ScrollView>
                <ImageContainer
                    style={{
                        backgroundColor: useColorModeValue('white', colors.black),
                        paddingHorizontal: 2,
                    }}
                >
                    <ChevronTextContainer>
                        <Text fontWeight={800} fontSize="3xl" marginLeft="10px" marginTop="20px">
                            {category}
                        </Text>
                    </ChevronTextContainer>
                    <Image style={{ height: 100, width: 100 }} source={image} />
                </ImageContainer>
                <Box px={1}>
                    <ListContainer colorNumber={800} rounded="none">
                        {habitData.map(({ habitIcon, description, color, name }, index) => (
                            <>
                                <TouchableOpacity
                                    key={name}
                                    onPress={() =>
                                        navigate('CreateHabit', {
                                            habitIcon: habitIcon,
                                            name: name,
                                            color: color,
                                        })
                                    }
                                >
                                    <Flex
                                        direction="row"
                                        align="center"
                                        justify="space-between"
                                        py={3}
                                    >
                                        <Flex direction="row" align="center">
                                            <Center
                                                align="center"
                                                mr={4}
                                                bg={useColorModeValue('gray.200', 'gray.700')}
                                                p={2}
                                                rounded="full"
                                                h={10}
                                                w={10}
                                            >
                                                <MaterialCommunityIcons
                                                    name={habitIcon}
                                                    size={24}
                                                    color={color}
                                                />
                                            </Center>
                                            <VStack>
                                                <Text fontWeight={500} fontSize="md">
                                                    {name}
                                                </Text>
                                                <Text fontSize="sm" opacity={0.7}>
                                                    {description}
                                                </Text>
                                            </VStack>
                                        </Flex>
                                        <Box>
                                            <Ionicons
                                                name="chevron-forward"
                                                size={20}
                                                color="gray"
                                            />
                                        </Box>
                                    </Flex>
                                </TouchableOpacity>
                                {index < habitData.length - 1 && (
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 0.4,
                                            opacity: 0.4,
                                            marginTop: 5,
                                        }}
                                    />
                                )}
                            </>
                        ))}
                    </ListContainer>
                </Box>
            </ScrollView>
        </MainContainer>
    );
};

export default HabitScreen;
