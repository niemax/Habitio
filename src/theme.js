import { extendTheme, themeTools } from 'native-base';

const customTheme = {
    config: {
        useSystemColorMode: true,
    },
    components: {
        Text: {
            color: themeTools.mode('white', 'black'),
        },
    },
};

const theme = extendTheme(customTheme);

export default theme;
