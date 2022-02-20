import React from 'react';
import { Button } from 'native-base';

const MainButton = ({ onPress, children, ...props }) => (
    <Button
        variant="subtle"
        colorScheme="indigo"
        rounded="2xl"
        w={200 || props.width}
        h={16 || props.height}
        onPress={onPress}
        {...props}
    >
        {children}
    </Button>
);

export default MainButton;
