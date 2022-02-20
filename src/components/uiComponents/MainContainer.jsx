import { Box, useColorModeValue } from 'native-base';
import React from 'react';
import { colors } from '../../utils/colors';

const MainContainer = ({ children }) => (
    <Box flex={1} bg={useColorModeValue(colors.white, colors.mainBackground)} align="center">
        {children}
    </Box>
);

export default MainContainer;
