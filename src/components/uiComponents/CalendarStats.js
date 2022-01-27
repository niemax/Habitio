import React from 'react';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import { Box, Flex, useColorModeValue, VStack, Text, useColorMode } from 'native-base';

const CalendarStats = ({ completedDates }) => {
    const {colorMode} = useColorMode()
    return (
        <Box p={3} shadow={2}>
            <Flex bg={colorMode === "light" ? 'gray.200': 'gray.800'} rounded="lg" p={3}>
                <Flex direction="row" justify="space-around">
                    <VStack>
                        <Text fontWeight={800} fontSize="xl" textAlign="center">
                            {Object.keys(completedDates).length}
                        </Text>
                        <Text fifteen>done</Text>
                    </VStack>
                    <VStack>
                        <Text fontWeight={800} fontSize="xl" textAlign="center">
                            {Object.keys(completedDates).length}
                        </Text>
                        <Text fifteen>longest</Text>
                    </VStack>
                    <VStack>
                        <Text fontWeight={800} fontSize="xl" textAlign="center">
                            {Object.keys(completedDates).length}
                        </Text>
                        <Text>current </Text>
                    </VStack>
                </Flex>
            </Flex>
            <CalendarLineBreak />
        </Box>
    );
};

export default CalendarStats;
