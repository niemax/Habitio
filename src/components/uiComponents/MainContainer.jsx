import { Box, useColorModeValue } from 'native-base';
import React from 'react';
import useSettings from '../../hooks/useSettings';

const MainContainer = ({ children }) => {
    const { colors } = useSettings();
    return (
        <Box flex={1} bg={useColorModeValue(colors.white, colors.mainBackground)} align="center">
            {children}
        </Box>
    );
};

export default MainContainer;
