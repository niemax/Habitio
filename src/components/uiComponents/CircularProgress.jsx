import React, { useEffect, useRef } from 'react';
import { Box, Button, Flex, Text, useColorMode, useColorModeValue } from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import AnimatedLottieView from 'lottie-react-native';
import { colors } from '../../utils/colors';
import { handleDoneToday } from '../../utils/helpers/handleDone';

export const RenderLottie = () => {
    const animation = useRef(null);

    useEffect(() => {
        animation.current.play();

        return () => animation.current?.pause();
    }, []);

    return (
        <AnimatedLottieView
            loop={false}
            ref={animation}
            source={require('../../assets/lottieJson/lf30_editor_usbjuird.json')}
        />
    );
};

const ProgressCircle = ({ id, habitProgress, handleHabitProgress, size, width, habitItem }) => {
    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habit = getSpecificHabit(id);

    const handleDecrement = () => {
        if (habit.completed) {
            handleDoneToday(id, habit.name, habits, habitSetter);
        } else if (habitProgress > 0) {
            handleHabitProgress(-1);
        }
    };

    const handleCirclePress = () => {
        if (habitProgress - habit.times === -1) {
            handleDoneToday(id, habit.name, habits, habitSetter);
        } else {
            handleHabitProgress(1);
        }
    };

    const handleIncrement = () => {
        if (habit.times - habitProgress === 1) {
            handleDoneToday(id, habit.name, habits, habitSetter);
        } else {
            if (!habit.completed) {
                handleHabitProgress(1);
            }
        }
    };

    const renderProgressCircle = () => (
        <TouchableOpacity onPress={handleCirclePress}>
            <CircularProgress
                inActiveStrokeColor={useColorModeValue('#F9F9F9', 'black')}
                inActiveStrokeWidth={width}
                activeStrokeWidth={width}
                value={!habit.completed ? habitProgress : habit.times}
                radius={size}
                duration={1000}
                textColor={useColorModeValue('black', 'white')}
                maxValue={habit.times}
                title={!!habitItem && !habit.completed && habit.unitValue}
                titleColor={useColorModeValue('black', 'white')}
                titleStyle={{ fontWeight: 'regular', fontSize: 20 }}
                activeStrokeColor={habit.completed ? '#43E443' : '#2465FD'}
                activeStrokeSecondaryColor={habit.completed ? '#43E4E4' : '#C25AFF'}
            />
        </TouchableOpacity>
    );

    return (
        habit?.times > 0 && (
            <Flex direction="row" justify="space-between" align="center">
                {!!habitItem && (
                    <Button
                        size="xs"
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        rounded="full"
                        mr={6}
                        _pressed={{ bg: colors.mainPurple }}
                        onPress={handleDecrement}
                    >
                        <AntDesign name="minus" size={24} color={colors.mainPurple} />
                    </Button>
                )}
                {renderProgressCircle()}
                {!!habitItem && (
                    <Box>
                        <Button
                            size="xs"
                            rounded="full"
                            _pressed={{ bg: colors.mainPurple }}
                            ml={6}
                            bg={useColorModeValue('gray.100', 'gray.700')}
                            onPress={handleIncrement}
                        >
                            <AntDesign name="plus" size={24} color={colors.mainPurple} />
                        </Button>
                    </Box>
                )}
            </Flex>
        )
    );
};

export default ProgressCircle;
