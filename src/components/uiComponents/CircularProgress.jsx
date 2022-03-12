import React, { useEffect, useRef } from 'react';
import { Box, Button, Flex, useColorModeValue } from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import AnimatedLottieView from 'lottie-react-native';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import useSettings from '../../hooks/useSettings';
import * as Animatable from 'react-native-animatable';

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

    const { colors } = useSettings();

    const handleDecrement = () => {
        if (habit.completed) {
            handleDoneToday(id, habit.name, habits, habitSetter);
        } else if (habitProgress > 0) {
            handleHabitProgress(-1);
        }
        animationRef.current?.pulse();
    };

    const handleCirclePress = () => {
        if (habitProgress - habit.times === -1) {
            handleDoneToday(id, habit.name, habits, habitSetter);
        } else {
            handleHabitProgress(1);
        }
        animationRef.current?.pulse();
    };

    const handleIncrement = () => {
        if (habit.times - habitProgress === 1) {
            handleDoneToday(id, habit.name, habits, habitSetter);
        } else {
            handleHabitProgress(1);
        }
        animationRef.current?.pulse();
    };

    const animationRef = useRef(null);

    const renderProgressCircle = () => (
        <TouchableWithoutFeedback onPress={handleCirclePress}>
            <Animatable.View ref={animationRef}>
                <CircularProgress
                    inActiveStrokeColor={useColorModeValue('#F9F9F9', 'black')}
                    inActiveStrokeWidth={width}
                    activeStrokeWidth={width}
                    duration={600}
                    value={!habit?.completed ? habitProgress : habit?.times || habit?.days}
                    radius={size}
                    textColor={useColorModeValue('black', 'white')}
                    maxValue={habit?.times}
                    title={!!habitItem && !habit?.completed && habit?.unitValue}
                    titleColor={useColorModeValue('black', 'white')}
                    titleStyle={{ fontWeight: 'regular', fontSize: 20 }}
                    activeStrokeColor={habit?.completed ? '#43E443' : colors.mainColor}
                    activeStrokeSecondaryColor={habit?.completed ? '#43E4E4' : '#C25AFF'}
                />
            </Animatable.View>
        </TouchableWithoutFeedback>
    );

    return (
        <Flex direction="row" justify="space-between" align="center">
            {habit?.times > 0 && !!habitItem ? (
                <Button
                    size="xs"
                    bg={useColorModeValue('gray.100', 'gray.700')}
                    rounded="full"
                    mr={6}
                    _pressed={{ bg: colors.mainColor }}
                    onPress={handleDecrement}
                >
                    <AntDesign name="minus" size={24} color={colors.mainColor} />
                </Button>
            ) : (
                !!habitItem && (
                    <Button
                        size="xs"
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        rounded="full"
                        mr={6}
                        _pressed={{ bg: colors.mainColor }}
                        onPress={handleDecrement}
                    >
                        <AntDesign name="minus" size={24} color={colors.mainColor} />
                    </Button>
                )
            )}
            {renderProgressCircle()}
            {habit?.times > 0 && !!habitItem ? (
                <Box>
                    <Button
                        size="xs"
                        rounded="full"
                        _pressed={{ bg: colors.mainColor }}
                        ml={6}
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        onPress={handleIncrement}
                    >
                        <AntDesign name="plus" size={24} color={colors.mainColor} />
                    </Button>
                </Box>
            ) : (
                !!habitItem && (
                    <Button
                        size="xs"
                        rounded="full"
                        _pressed={{ bg: colors.mainColor }}
                        ml={6}
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        onPress={handleIncrement}
                    >
                        <AntDesign name="plus" size={24} color={colors.mainColor} />
                    </Button>
                )
            )}
        </Flex>
    );
};

export default ProgressCircle;
