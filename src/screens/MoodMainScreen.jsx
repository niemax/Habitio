import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Keyboard,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Box,
    Center,
    FlatList,
    Flex,
    Stagger,
    Text,
    useColorModeValue,
    Tooltip,
    Button,
    HStack,
} from 'native-base';
import Modal from 'react-native-modal';
import MainButton from '../components/uiComponents/Button';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import useSettings from '../hooks/useSettings';
import { useMoods } from '../context/MoodProvider';
import { HabitDescriptionInput } from '../utils/StyledComponents/Styled';
import { getCurrentDateFormatted } from '../utils/helpers/dateHelpers';
import { renderEmoji } from './MoodDetailsScreen';
import { scheduleMoodNotification } from '../utils/helpers/notification';
import { renderIconBackgroundColor } from '../utils/helpers/renderIconBackgroundColor';

const { width } = Dimensions.get('window');

const MoodMainScreen = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);

    const { colors, color } = useSettings();
    const { moods, addMood, isLoading } = useMoods();
    const [text, setText] = useState('');
    const [moodIndex, setMoodIndex] = useState();
    const [moodName, setMoodName] = useState('');
    const [tooltipOpen, setTooltipOpen] = useState();

    const { navigate } = navigation;
    const textInputRef = useRef(null);

    useEffect(async () => {
        const isFirstMoodLaunch = await AsyncStorage.getItem('@firstMoodLaunch');
        if (isFirstMoodLaunch === null) {
            await scheduleMoodNotification();
            await AsyncStorage.setItem('@firstMoodLaunch', 'false');
        } else {
            return;
        }
    }, []);

    useEffect(() => {
        checkIfShouldOpenTooltip();
        const timeout = setTimeout(() => setTooltipOpen(false), 7000);
        return () => clearTimeout(timeout);
    }, []);

    const checkIfShouldOpenTooltip = () => {
        const currentDate = getCurrentDateFormatted(new Date());
        // this is definitely not the best approach performance wise. Fix this
        const includesCurrentDate = moods.every((mood) => mood.date !== currentDate);
        if (!!includesCurrentDate) {
            setTooltipOpen(true);
        }
        return;
    };

    const handleMood = () => {
        const date = getCurrentDateFormatted(new Date());
        const moodObject = {
            text: text,
            moodName: moodName,
            id: Math.floor(Math.random() * 10000),
            date: date,
        };
        Keyboard.dismiss();
        setTimeout(() => {
            addMood(moodObject);
            setIsVisible(false);
            setMoodName('');
            setText('');
            setMoodIndex();
        }, 100);
    };

    const MOODS = ['Happy', 'Neutral', 'Sad'];

    useEffect(() => {
        setMoodName(MOODS[moodIndex]);
    }, [moodIndex]);

    const currentDate = getCurrentDateFormatted(new Date());

    const renderMoodItem = ({ item }) => (
        <>
            <Stagger
                visible={true}
                initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: 14,
                }}
                animate={{
                    translateY: 1,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: 'spring',
                        mass: 0.3,
                        stagger: {
                            offset: 10,
                        },
                    },
                }}
            >
                <Box px={4} py={3}>
                    <Text fontSize="xl" fontWeight={600} mb={2}>
                        {item.date === currentDate ? 'Today' : item.date}
                    </Text>
                </Box>
                <TouchableOpacity
                    onPress={() =>
                        navigate('MoodDetailsScreen', {
                            id: item.id,
                            date: item.date,
                        })
                    }
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                        alignItems: 'center',
                    }}
                >
                    <Flex direction="row" align="center">
                        <Text fontSize={30}>{renderEmoji(item.moodName)}</Text>
                        <Text ml={1} fontSize="md" fontWeight={600}>
                            {item.moodName}
                        </Text>
                    </Flex>
                    <Box>
                        <Ionicons name="chevron-forward" size={20} color="gray" />
                    </Box>
                </TouchableOpacity>
            </Stagger>
        </>
    );

    const renderMoodButtons = () => (
        <>
            <TouchableOpacity
                onPress={() => {
                    setMoodIndex(0);
                    textInputRef.current?.focus();
                }}
            >
                <Text fontSize={70}>😊</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setMoodIndex(1);
                    textInputRef.current?.focus();
                }}
            >
                <Text fontSize={70}>😐</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setMoodIndex(2);
                    textInputRef.current?.focus();
                }}
            >
                <Text fontSize={70}>😞</Text>
            </TouchableOpacity>
        </>
    );

    const renderModal = () => (
        <Modal
            onSwipeComplete={() => setIsVisible(false)}
            swipeDirection="down"
            isVisible={isVisible}
            swipeThreshold={100}
            onBackdropPress={() => Keyboard.dismiss()}
            backdropOpacity={0.2}
            animationInTiming={500}
            animationOutTiming={500}
            propagateSwipe={true}
            avoidKeyboard={true}
            backdropTransitionOutTiming={0}
            onModalHide={() => {
                setMoodName('');
                setText('');
            }}
        >
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                px={4}
                py={4}
                justify="center"
                align="center"
                rounded="xl"
            >
                <Text fontSize="xl" fontWeight={800}>
                    Choose a mood
                </Text>
                <Box mt={2}>
                    <Text fontSize="md" textAlign="center">
                        Which face describes your current feeling the best?
                    </Text>
                    <Flex direction="row" justify="space-around" mt={4}>
                        {renderMoodButtons()}
                    </Flex>
                    <Box mt={4}>
                        <Text fontWeight={500} fontSize="md">
                            Add a comment (optional)
                        </Text>
                        <Center>
                            <HabitDescriptionInput
                                ref={textInputRef}
                                multiline={true}
                                placeholder={!!moodName ? `Why am I ${moodName}?` : 'Comment'}
                                placeholderTextColor="gray"
                                style={{
                                    backgroundColor: useColorModeValue(colors.white, colors.black),
                                    color: useColorModeValue('black', 'white'),
                                    width: width - 80,
                                    height: 120,
                                }}
                                onChangeText={(text) => setText(text)}
                            />
                        </Center>
                    </Box>
                </Box>

                <Button.Group colorScheme={renderIconBackgroundColor(color)} space={2}>
                    <Button
                        h={50}
                        w={40}
                        variant="solid"
                        rounded="lg"
                        isDisabled={!moodName}
                        onPress={handleMood}
                    >
                        Done
                    </Button>
                </Button.Group>
            </Flex>
        </Modal>
    );

    const renderFooter = () => (
        <Box>
            <Tooltip
                label={
                    <Text fontSize="md" color={useColorModeValue('black', 'white')}>
                        How you are you feeling today? 😊{' '}
                    </Text>
                }
                isOpen={tooltipOpen}
                openDelay={2000}
                placement="top left"
                bg={useColorModeValue('white', 'gray.800')}
                h="auto"
                py={2}
                shadow="none"
                rounded="xl"
                closeOnClick={true}
                hasArrow={true}
                offset={2}
            >
                <View style={{ position: 'absolute', bottom: 100, right: 30 }}>
                    <MainButton
                        align="center"
                        justify="center"
                        w={12}
                        h={12}
                        rounded="full"
                        onPress={() => setIsVisible(true)}
                        shadow={4}
                    >
                        <AntDesign name="plus" size={24} color="white" />
                    </MainButton>
                </View>
            </Tooltip>
        </Box>
    );

    const ItemSeparatorComponent = () => (
        <View
            style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.4,
                opacity: 0.4,
                marginTop: 5,
                width: '100%',
            }}
        />
    );

    if (!!isLoading)
        return (
            <Center flex={1}>
                <ActivityIndicator size="small" color={colors.mainColor} />
            </Center>
        );

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            {renderModal()}
            <Box flex={1} mt={4}>
                <FlatList
                    scrollEnabled={true}
                    overScrollMode="always"
                    lazy
                    data={moods?.sort((a, b) => b.date - a.date)}
                    renderItem={renderMoodItem}
                    keyExtractor={({ id }) => id}
                    contentContainerStyle={{ marginTop: 140 }}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                />
            </Box>
            {renderFooter()}
        </Flex>
    );
};

export default MoodMainScreen;
