import React, { useEffect, useState } from 'react';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import { Box, Flex, Text, useColorMode } from 'native-base';
import useSettings from '../../hooks/useSettings';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CalendarStats = ({ completedDates }) => {
    const { colorMode } = useColorMode();
    const [streak, setStreak] = useState(0);

    const { colors } = useSettings();

    useEffect(() => {
        const dates = Object.values(completedDates).map((date) => date.date);
        let count = 0;
        dates?.forEach((el, i) => {
            if (
                new Date(el).setUTCHours(0, 0, 0, 0) - new Date().setUTCHours(0, 0, 0, 0) ===
                i * 86400000
            ) {
                count++;
            } else {
                count = 0;
            }
            return count;
        });
        setStreak(count);
    }, [completedDates?.length]);

    return (
        <Box p={3}>
            <Flex bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} rounded="lg" p={3}>
                <Flex direction="row" justify="space-around">
                    <Flex align="center">
                        <Text fontWeight={900} fontSize="xl" textAlign="center">
                            {Object.keys(completedDates).length}
                        </Text>
                        <MaterialCommunityIcons
                            name="trophy-award"
                            size={24}
                            color={colors.mainColor}
                        />
                        <Text fifteen opacity={0.7}>
                            total done
                        </Text>
                    </Flex>
                    <Flex align="center">
                        <Text fontWeight={900} fontSize="xl" textAlign="center"></Text>
                        <MaterialCommunityIcons
                            name="trophy-award"
                            size={24}
                            color={colors.mainColor}
                        />
                        <Text fifteen opacity={0.7}>
                            avg. completion
                        </Text>
                    </Flex>
                    <Flex align="center" justify="center">
                        <Text
                            fontWeight={900}
                            fontSize="xl"
                            textAlign="center"
                            color={colors.mainColor}
                        >
                            {streak}
                        </Text>
                        🔥
                        <Text opacity={0.7}>current streak</Text>
                    </Flex>
                </Flex>
            </Flex>
            <CalendarLineBreak />
        </Box>
    );
};

export default CalendarStats;
