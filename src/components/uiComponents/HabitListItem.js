import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { HomepageDataBox, HomepageDataView } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import {
    Box,
    HStack,
    VStack,
    useDisclose,
    Center,
    Text,
    Flex,
    useColorMode,
    Button,
    useColorModeValue,
} from 'native-base';
import ActionSheet from './ActionSheet';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { haptics } from '../../utils/helpers/haptics';
import { useHabits } from '../../context/HabitProvider';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import { renderIconBackgroundColor } from '../../utils/helpers/renderIconBackgroundColor';
import { habitItemShadow } from '../../utils/globalStyles';
import AnimatedLottieView from 'lottie-react-native';

export const RenderLottieOrIcon = ({ lottieAnimating = true, setLottieAnimating }) => {
    const animation = useRef(null);

    useEffect(() => {
        animation.current.play();
        setLottieAnimating(true);
        const timeout = setTimeout(() => {
            animation.current.pause();
            setLottieAnimating(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {!lottieAnimating && <Entypo name="check" size={20} color={colors.mainPurple} />}
            <AnimatedLottieView
                ref={animation}
                source={require('../../assets/lottieJson/lf30_editor_oua2u7xf.json')}
            />
        </>
    );
};

const HabitListItem = ({ item, onPressMethod }) => {
    const { icon, completed, times, progress, color, name, id, unitValue, specificDate } = item;
    const [habitProgress, setHabitProgress] = useState(progress);
    const { isOpen, onOpen, onClose } = useDisclose();
    const { colorMode } = useColorMode();
    const { habitSetter, habits } = useHabits();
    const [lottieAnimating, setLottieAnimating] = useState(false);

    const handleHabitProgress = (operand) => {
        haptics.success();
        const mapped = habits.map((habit) => {
            setHabitProgress(habitProgress + Number(operand));
            habit.progress += Number(operand);
            return habit;
        });
        habitSetter(mapped);
    };

    const renderIcon = () =>
        !!icon ? (
            <Image style={{ height: 15, width: 15 }} source={icon} />
        ) : (
            <Feather name="activity" size={15} color={color || colors.mainPurple} />
        );

    return (
        <>
            <HomepageDataView>
                <HomepageDataBox
                    onPress={onOpen || onPressMethod}
                    style={{
                        backgroundColor: colorMode === 'light' ? 'white' : '#151618',
                        ...habitItemShadow,
                    }}
                >
                    <HStack>
                        <Flex align="center" mt={1}>
                            <Button
                                variant="subtle"
                                opacity={useColorModeValue(0.6, 0.8)}
                                colorScheme={renderIconBackgroundColor(color)}
                                p={3}
                                rounded="full"
                            >
                                {renderIcon()}
                            </Button>
                        </Flex>
                        <Box ml={3}>
                            <VStack space={0.5}>
                                <Text
                                    fontWeight={600}
                                    fontSize="md"
                                    color={
                                        !!completed
                                            ? 'gray.500'
                                            : colorMode === 'light'
                                            ? 'black'
                                            : 'white'
                                    }
                                    textDecorationLine={!!completed ? 'line-through' : 'none'}
                                >
                                    {name}
                                </Text>
                                {times > 0 && (
                                    <Text fontWeight={400} fontSize="sm">
                                        Goal: {times} {unitValue} per day
                                    </Text>
                                )}
                                {specificDate !== null && (
                                    <Text marginTop="4px">
                                        Doing it once on {formatDateForHabitEndDate(specificDate)}
                                    </Text>
                                )}
                            </VStack>
                        </Box>
                    </HStack>
                    {times > 0 && (
                        <Center>
                            <TouchableOpacity
                                onPress={() => {
                                    if (habitProgress - times === -1) {
                                        handleDoneToday(id, name, habits, habitSetter);
                                    } else {
                                        handleHabitProgress(1);
                                    }
                                }}
                            >
                                <AnimatedCircularProgress
                                    fillLineCap="round"
                                    size={58}
                                    width={7}
                                    fill={!completed ? (habitProgress / times) * 100 : 100}
                                    tintColor={colors.mainPurple}
                                    backgroundColor={
                                        colorMode === 'light' ? '#f5f5f5' : colors.black
                                    }
                                >
                                    {() =>
                                        !completed ? (
                                            <Text fontSize="sm" fontWeight={600}>
                                                {habitProgress}
                                            </Text>
                                        ) : (
                                            <RenderLottieOrIcon
                                                lottieAnimating={lottieAnimating}
                                                setLottieAnimating={setLottieAnimating}
                                            />
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </TouchableOpacity>
                        </Center>
                    )}
                </HomepageDataBox>
                <ActionSheet
                    id={id}
                    habitProgress={habitProgress}
                    setHabitProgress={setHabitProgress}
                    handleHabitProgress={handleHabitProgress}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </HomepageDataView>
        </>
    );
};

export default HabitListItem;
