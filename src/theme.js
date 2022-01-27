import { extendTheme, themeTools } from 'native-base';

const customTheme = {
    config: {
        useSystemColorMode: true,
    },
    fontConfig: {
        400: {
            normal: 'Regular',
        },
        500: {
            normal: 'Medium',
        },
        600: {
            normal: 'SemiBold',
        },
        700: {
            normal: 'Bold',
        },
        800: {
            normal: 'ExtraBold',
        },
    },
    components: {
        Text: {
            color: themeTools.mode('white', 'black'),
        },
    },
};

const theme = extendTheme(customTheme);

export default theme;
