import * as Haptics from 'expo-haptics';

export const haptics = {
    selection: () => {
        Haptics.selectionAsync();
    },
};
