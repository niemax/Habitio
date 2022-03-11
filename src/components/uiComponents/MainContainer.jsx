import { Box, useColorModeValue } from 'native-base';
import React from 'react';
import useSettings from '../../hooks/useSettings';

const MainContainer = ({ bgColor , children }) => {
    const { colors } = useSettings();
    return (
        <Box flex={1} bg={useColorModeValue(bgColor  || colors.white, colors.mainBackground)} align="center">
            {children}
        </Box>
    );
};

export default MainContainer;
