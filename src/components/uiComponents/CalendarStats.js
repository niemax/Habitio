import React from 'react';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import { Box, Flex, useColorModeValue, VStack, Text } from 'native-base';

const CalendarStats = ({ completedDates }) => (
    <Box p={3} shadow={2}>
        <Box bg={useColorModeValue('gray.300', 'gray.800')} rounded="lg" p={3}>
            <Flex direction="row" justify="space-around">
                <VStack>
                    <Text fontWeight={800} fontSize="xl">
                        {Object.keys(completedDates).length}
                    </Text>
                    <Text fifteen fontFamily="Medium">
                        done
                    </Text>
                </VStack>
                <VStack>
                    <Text fontWeight={800} fontSize="xl">
                        {Object.keys(completedDates).length}
                    </Text>
                    <Text fifteen fontFamily="Medium">
                        longest
                    </Text>
                </VStack>
                <VStack>
                    <Text fontWeight={800} fontSize="xl">
                        {Object.keys(completedDates).length}
                    </Text>
                    <Text>current {'\n'} streak</Text>
                </VStack>
            </Flex>
        </Box>
        <CalendarLineBreak />
    </Box>
);

export default CalendarStats;
