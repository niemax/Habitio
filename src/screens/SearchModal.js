import React, { useState } from 'react';
import { Flex, useColorModeValue, Box, ScrollView } from 'native-base';
import { colors } from '../utils/colors';
import { HomepageDataView } from '../utils/StyledComponents/Styled';
import { useHabits } from '../context/HabitProvider';
import HabitListItem from '../components/uiComponents/HabitListItem';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native';

const SearchModal = ({ navigation }) => {
    const { habits } = useHabits();
    const [data, setData] = useState([]);

    const filterData = (input) => {
        const mapped = habits.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase());
        });
        setData(mapped);
    };

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.mainBackground)}>
            <ScrollView>
                <Box mt={20} px={4}>
                    <Flex
                        direction="row"
                        align="center"
                        justify="center"
                        bg={useColorModeValue('gray.300', 'gray.800')}
                        opacity={0.7}
                        px={1}
                        rounded="lg"
                        shadow={2}
                    >
                        <Ionicons name="search" size={22} color="gray" />
                        <TextInput
                            placeholder="Search"
                            autoFocus={true}
                            clearButtonMode="always"
                            style={{
                                color: useColorModeValue('black', 'white'),
                                fontSize: 17,
                                padding: 10,
                                borderRadius: 10,
                                width: '92%',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.15,
                                shadowRadius: 4.84,
                                elevation: 4,
                            }}
                            onChangeText={(text) => filterData(text)}
                        />
                    </Flex>
                    <Box mt={2}>
                        {data.map((item) => (
                            <HomepageDataView key={item.id}>
                                <HabitListItem item={item} />
                            </HomepageDataView>
                        ))}
                    </Box>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default SearchModal;
