import React, { useState } from 'react';
import { Flex, useColorModeValue, Box, ScrollView } from 'native-base';
import { colors } from '../utils/colors';
import { HomepageDataView } from '../utils/StyledComponents/Styled';
import { useHabits } from '../context/HabitProvider';
import HabitListItem from '../components/uiComponents/HabitListItem';
import { TextInput } from 'react-native';

const SearchModal = () => {
    const { habits } = useHabits();
    const [data, setData] = useState([]);

    const filterData = (input) => {
        const mapped = habits.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase());
        });
        setData(mapped);
    };

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            <ScrollView>
                <Box mt={20} px={4}>
                    <TextInput
                        autoFocus={true}
                        clearButtonMode="always"
                        style={{
                            backgroundColor: useColorModeValue('white', '#27272a'),
                            color: useColorModeValue('black', 'white'),
                            fontSize: 17,
                            padding: 10,
                            borderRadius: 10,
                            width: '100%',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 2.84,
                            elevation: 4,
                        }}
                        onChangeText={(text) => filterData(text)}
                        placeholder="Search habit"
                    />

                    <Box mt={10}>
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
