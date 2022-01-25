import { Alert } from 'react-native';

export const displayDeleteAlert = (method) => {
    Alert.alert(
        'Delete Habit',
        'Are you sure you want to delete this habit? Action cannot be undone.',
        [
            {
                text: 'OK',
                onPress: () => method(),
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]
    );
};
