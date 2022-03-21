import React from 'react';
import { Box, Center, Flex, HStack, Text, useColorModeValue, VStack } from 'native-base';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useMoods } from '../context/MoodProvider';
import useSettings from '../hooks/useSettings';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentDateFormatted } from '../utils/helpers/dateHelpers';
import { getHours, getMinutes } from 'date-fns';

export const renderEmoji = (mood) => {
    let text;
    switch (mood) {
        case 'Happy':
            return (text = '😊');
            break;
        case 'Neutral':
            return (text = '😐');
            break;
        case 'Sad':
            return (text = '😞');
            break;
        default:
            '';
    }
    return text;
};

const MoodDetailsScreen = ({ route, navigation }) => {
    const { colors } = useSettings();
    const { getSpecificMood, deleteMood } = useMoods();
    const { id } = route.params;
    const moodItem = getSpecificMood(id);

    console.log(moodItem);
    const { navigate, goBack } = navigation;

    const currentDateFormatted = getCurrentDateFormatted(new Date());

    const formatDate = () => {
        if (currentDateFormatted === getCurrentDateFormatted(new Date(moodItem?.date))) {
            const hours = getHours(new Date(moodItem?.dateObject));
            const minutes = getMinutes(new Date(moodItem?.dateObject));
            return (
                <Text>
                    Today, {hours}:{minutes}
                </Text>
            );
        } else {
            return (
                <Text>
                    {getCurrentDateFormatted(new Date(moodItem?.dateObject))}, {hours}:${minutes}
                </Text>
            );
        }
    };

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
                <Box mt={40} px={4}>
                    <Flex direction="row" justify="space-between" align="center">
                        <Text fontSize={16}>{formatDate()}</Text>
                        <Flex direction="row" justify="flex-end" align="baseline">
                            <TouchableOpacity
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
