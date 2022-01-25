import React from 'react';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import { Box, Flex, VStack } from 'native-base';

const CalendarStats = ({ completedDates }) => (
    <Box p={3} shadow={2}>
        <Box bg="gray.800" rounded="lg" p={3}>
            <Flex direction="row" justify="space-around">
                <VStack>
                    <Text twentyEight fontFamily="Extra">
                        {Object.keys(completedDates).length}
                    </Text>
                    <Text fifteen fontFamily="Medium" color="gray">
                        done
                    </Text>
                </VStack>
                <VStack>
                    <Text twentyEight fontFamily="Extra">
                        {Object.keys(completedDates).length}
                    </Text>
                    <Text fifteen fontFamily="Medium" color="gray">
                        longest
                    </Text>
                </VStack>
                <VStack>
                    <Text twentyEight fontFamily="Extra">
                        {Object.keys(completedDates).length}
                    </Text>
                    <Text fifteen fontFamily="Medium" color="gray">
                        current {'\n'} streak
                    </Text>
                </VStack>
            </Flex>
        </Box>
        <CalendarLineBreak />
    </Box>
);

export default CalendarStats;
