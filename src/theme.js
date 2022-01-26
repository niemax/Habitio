import { extendTheme, themeTools } from 'native-base';

const config = {
    useSystemColorMode: true,
    initialColorMode: 'light',
    fontConfig: {
        Raleway: {
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
            // Add more variants
            //   700: {
            //     normal: 'Raleway-Bold',
            //   },
            //   800: {
            //     normal: 'Raleway-Bold',
            //     italic: 'Raleway-BoldItalic',
            //   },
            //   900: {
            //     normal: 'Raleway-Bold',
            //     italic: 'Raleway-BoldItalic',
            //   },
        },
    },
    fonts: {
        heading: 'Bold',
        body: 'Bold',
        mono: 'Bold',
    },
    components: {
        Text: {
            // Can simply pass default props to change default behaviour of components.
            color: themeTools.mode('white', 'black'),
        },
    },
};

export const extendedTheme = extendTheme({ config });
