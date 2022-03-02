import React, { useState } from 'react';
import { Box, Center, Flex, HStack, Text, useColorModeValue } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useMoods } from '../context/MoodProvider';
import useSettings from '../hooks/useSettings';
import { Ionicons } from '@expo/vector-icons';

const MoodDetailsScreen = ({ route, navigation }) => {
    const { colors } = useSettings();
    const { getSpecificMood, deleteMood } = useMoods();
    const { id } = route.params;
    const moodItem = getSpecificMood(id);

    const { navigate, goBack } = navigation;

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            <Box mt={40} px={4}>
                <HStack>
                    <Text fontSize="lg" fontWeight={600}>
                        On this beautiful day I felt:{' '}
                        <Text fontWeight={800}>{moodItem?.moodName}</Text>, because{' '}
                        <Text fontWeight={800}>
                            {!!moodItem?.text
                                ? moodItem?.text
                                : `It was such a ${
                                      moodItem.moodName === 'Happy' ? 'beautiful' : 'cool'
                                  } day`}
                        </Text>
                    </Text>

                    <TouchableOpacity
                        style={{ marginLeft: 30 }}
                        onPress={() =>
                            navigate('MoodEditScreen', {
                                text: moodItem.text,
                                id: id,
                            })
                        }
                    >
                        <Ionicons name="pencil" size={24} color={colors.mainColor} />
                    </TouchableOpacity>
                </HStack>
                <TouchableOpacity
                    onPress={() => {
                        deleteMood(id);
                        goBack();
                    }}
                >
                    <Center mt={20}>
                        <Text fontWeight={700} fontSize="xl" color={colors.error}>
                            Delete mood
                        </Text>
                    </Center>
                </TouchableOpacity>
            </Box>
        </Flex>
    );
};

export default MoodDetailsScreen;
