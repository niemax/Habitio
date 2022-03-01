import { Box, useColorModeValue } from 'native-base';
import React from 'react';

const ListContainer = ({ colorNumber = 800, rounded = 'xl', py = 1, children }) => (
    <Box
        bg={useColorModeValue('white', `gray.${colorNumber}`)}
        rounded={rounded}
        py={py}
        px={3}
        mt={3}
    >
        {children}
    </Box>
);

export default ListContainer;
