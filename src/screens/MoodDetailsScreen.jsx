import React from 'react';
import { Box, Center, Flex, HStack, Text, useColorModeValue, VStack } from 'native-base';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useMoods } from '../context/MoodProvider';
import useSettings from '../hooks/useSettings';
import { Ionicons } from '@expo/vector-icons';

export const renderEmoji = (mood) => {
    let text;
    switch (mood) {
        case 'Happy':
            return (text = '🥳');
        case 'Neutral':
            return (text = '😐');
        case 'Sad':
            return (text = '😞');
    }
    return text;
};

const MoodDetailsScreen = ({ route, navigation }) => {
    const { colors } = useSettings();
    const { getSpecificMood, deleteMood } = useMoods();
    const { id } = route.params;
    const moodItem = getSpecificMood(id);

    const { navigate, goBack } = navigation;

    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete Mood',
            'Are you sure you want to delete this Mood? Action cannot be undone.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        deleteMood(id);
                        goBack();
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            <ScrollView>
                <Box mt={32} px={4}>
                    <Flex direction="row" justify="space-between" align="center">
                        <Text fontWeight={800} fontSize={32}>
                            Summary
                        </Text>
                        <Flex direction="row" justify="flex-end" align="baseline">
                            <TouchableOpacity
                                style={{ marginLeft: 5 }}
                                onPress={() =>
                                    navigate('MoodEditScreen', {
                                        text: moodItem?.text,
                                        id: id,
                                    })
                                }
                            >
                                <HStack space={2}>
                                    <Text color={colors.mainColor} fontSize="lg">
                                        Edit
                                    </Text>
                                    <Ionicons name="pencil" size={24} color={colors.mainColor} />
                                </HStack>
                            </TouchableOpacity>
                        </Flex>
                    </Flex>
                    <VStack space={12}>
                        <Box mt={10}>
                            <Text fontSize="lg" fontWeight={600}>
                                How did I feel?
                            </Text>
                            <Text fontSize="md">
                                {moodItem?.moodName} {renderEmoji(moodItem?.moodName)}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize="lg" fontWeight={600}>
                                Why did I feel {moodItem?.moodName}?
                            </Text>
                            <Text fontSize="md">
                                {!!moodItem?.text ? moodItem?.text : 'No additional details'}
                            </Text>
                        </Box>
                    </VStack>
                    <Center mt={40}>
                        <TouchableOpacity onPress={() => displayDeleteAlert()}>
                            <HStack>
                                <Ionicons name="trash" size={24} color={colors.error} />
                                <Text fontWeight={700} fontSize="xl" color={colors.error}>
                                    Delete mood
                                </Text>
                            </HStack>
                        </TouchableOpacity>
                    </Center>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default MoodDetailsScreen;
