import React from 'react';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import { Box, Flex, VStack, Text, useColorMode } from 'native-base';
import useSettings from '../../hooks/useSettings';

const CalendarStats = ({ completedDates, streak = [] }) => {
    const { colorMode } = useColorMode();

    const { colors } = useSettings();

    const renderStreak = () => !!streak.length && streak.reduce((acc, curr) => acc + curr);

    return (
        <Box p={3} shadow={1}>
            <Flex bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} rounded="lg" p={3}>
                <Flex direction="row" justify="space-around">
                    <VStack>
                        <Text fontWeight={900} fontSize="xl" textAlign="center">
                            {Object.keys(completedDates).length}
                        </Text>
                        <Text fifteen opacity={0.7}>
                            total done
                        </Text>
                    </VStack>
                    <VStack>
                        <Text
                            fontWeight={900}
                            fontSize="xl"
                            textAlign="center"
                            color={colors.mainColor}
                        >
                            {streak && renderStreak()}
                        </Text>
                        <Text fifteen opacity={0.7}>
                            current streak
                        </Text>
                    </VStack>
                </Flex>
            </Flex>
            <CalendarLineBreak />
        </Box>
    );
};

export default CalendarStats;
