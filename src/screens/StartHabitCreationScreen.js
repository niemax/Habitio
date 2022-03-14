import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { ButtonContainer, HabitInput, InputContainer } from '../utils/StyledComponents/Styled';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Box, Flex, Text, useColorModeValue, VStack } from 'native-base';
import Button from '../components/uiComponents/Button';
import MainContainer from '../components/uiComponents/MainContainer';
import ListContainer from '../components/uiComponents/ListContainer';
import useSettings from '../hooks/useSettings';
import { LineBreak, SettingTouchable } from './SettingsScreen';
import { useHabits } from '../context/HabitProvider';

const StartHabitCreation = ({ navigation }) => {
    const [habitName, setHabitName] = useState('');
    const [error, setError] = useState('');
    const { navigate } = navigation;

    const { colors } = useSettings();

    const { initialData } = useHabits();

    const handleOwnHabit = () => {
        if (habitName === '') {
            setError('Name Required');
            scrollviewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
        } else {
            navigate('CreateHabit', {
                habitName: habitName,
            });
        }
    };

    const renderLineBreak = () => <LineBreak />;

    const scrollviewRef = useRef(null);

    const inputErrorStyle = {
        borderWidth: 1,
        borderColor: colors.error,
    };

    return (
        <MainContainer bgColor="#EFEFEF">
            <ScrollView contentInsetAdjustmentBehavior="automatic" ref={scrollviewRef}>
                <Box px={4}>
                    <Text marginTop="20px" ml={5}>
                        CREATE YOUR OWN HABIT
                    </Text>
                    <InputContainer>
                        <HabitInput
                            clearButtonMode="always"
                            placeholder="habit name..."
                            placeholderTextColor="gray"
                            style={[
                                {
                                    backgroundColor: useColorModeValue('white', '#27272a'),
                                    color: useColorModeValue('black', 'white'),
                                },
                                !!error && inputErrorStyle,
                            ]}
                            onChangeText={(text) => {
                                setError('');
                                setHabitName(text);
                            }}
                        />
                    </InputContainer>

                    <Text marginLeft="25px" marginTop="10px" color={colors.error}>
                        {error}
                    </Text>
                    <Box mt={2} mb={40}>
                        <Text mb={4} ml={5}>
                            OR CHOOSE
                        </Text>
                        {initialData.map(({ category, habits }) => (
                            <Box mb={8} mt={2} key={category}>
                                <Text opacity={0.6} ml={5}>
                                    {category.toUpperCase()}
                                </Text>
                                <ListContainer py={1}>
                                    {habits.map((habit, index) => (
                                        <Box px={1} py={1.5} key={habit.name}>
                                            <SettingTouchable
                                                onPress={() =>
                                                    navigate('CreateHabit', {
                                                        habitName: habit.name,
                                                        habitIcon: habit.habitIcon,
                                                        color: habit.color,
                                                        defaultTimes: habit.defaultTimes,
                                                        defaultUnit: habit.defaultUnit,
                                                        defaultGoal: habit.defaultGoal,
                                                    })
                                                }
                                            >
                                                <Flex
                                                    direction="row"
                                                    justify="space-between"
                                                    align="center"
                                                    mb={1}
                                                >
                                                    {habit.habitIcon === 'cleaning-services' ? (
                                                        <MaterialIcons
                                                            size={24}
                                                            color={habit.color}
                                                            name={habit.habitIcon}
                                                        />
                                                    ) : (
                                                        <MaterialCommunityIcons
                                                            size={24}
                                                            color={habit.color}
                                                            name={habit.habitIcon}
                                                        />
                                                    )}
                                                    <VStack ml={4}>
                                                        <Text fontSize={17}>{habit.name}</Text>
                                                    </VStack>
                                                </Flex>
                                                <Ionicons
                                                    name="chevron-forward"
                                                    size={20}
                                                    color="gray"
                                                />
                                            </SettingTouchable>
                                            {index < habits.length - 1 && renderLineBreak()}
                                        </Box>
                                    ))}
                                </ListContainer>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </ScrollView>
            <ButtonContainer>
                <Button onPress={handleOwnHabit} w="100%">
                    Next
                </Button>
            </ButtonContainer>
        </MainContainer>
    );
};

export default StartHabitCreation;
