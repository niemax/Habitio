import React from 'react';
import { Button } from 'native-base';
import { renderIconBackgroundColor } from '../../utils/helpers/renderIconBackgroundColor';
import useSettings from '../../hooks/useSettings';

const MainButton = ({ onPress, children, variant = 'solid', rounded = '2xl', width = 200, height = 16, ...props }) => {
    const { color} = useSettings()

    return(
    <Button
        variant={variant}
        colorScheme={renderIconBackgroundColor(color)}
        rounded={rounded}
        w={width}
        h={height}
        onPress={onPress}
        _text={{color: "white"}}
        {...props}
    >
        {children}
    </Button>
    )

};

export default MainButton;
