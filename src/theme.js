import { extendTheme } from 'native-base';
import { useColorModeValue } from 'native-base';

const config = {
    useSystemColorMode: true,
    initialColorMode: 'light',
};

export const extendedTheme = extendTheme({ config });
