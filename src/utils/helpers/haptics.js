import * as Haptics from 'expo-haptics';

export const haptics = {
    selection: () => {
        Haptics.selectionAsync();
    },
    success: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    warning: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    },
};
