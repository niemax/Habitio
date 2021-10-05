import React, { useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../components/ColorPalletteModal';
import { colors } from '../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import { Modalize } from 'react-native-modalize';
import { habitBoxShadow } from '../utils/globalStyles';
import {
    CreateHabitHeader,
    FrequencySwitchContainer,
    FrequencyTouchable,
    HabitCentered,
    HabitDescriptionInput,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    MainContainer,
    SelectHabitColorButton,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { useHabits } from '../context/HabitProvider';
import schedulePushNotification from '../utils/helpers/notification';
import MapModal from '../components/modalComponents/MapModal';

export default function CreateHabit({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [specificDate, setSpecificDate] = useState(new Date());
    const [reminderTime, setReminderTime] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const [isEnabledLocation, setIsEnabledLocation] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [isMapModalVisible, setIsMapModalVisible] = useState(false);

    const modalizeRef = useRef(null);

    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);

    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);

    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);

    const toggleSwitchLocation = () =>
        !isEnabledDate &&
        !isEnabled &&
        !isEnabledSpecific &&
        setIsEnabledLocation((previousState) => {
            !previousState;
            modalizeRef.current.open();
        });

    const { CRUDHabits } = useHabits();

    const { habitName, habitIcon } = route.params;

    const placeholder = {
        label: 'Choose...',
        value: null,
        color: '#9EA0A4',
    };

    const content = {
        title: habitName,
        body: `Time to be productive! Your daily reminder to ${habitName}`,
    };

    const contentSpecific = {
        title: habitName,
        body: `Reminder for ${habitName}`,
    };

    const trigger = {
        hour: reminderTime.getHours(),
        minute: reminderTime.getMinutes(),
    };

    const triggerSpecific = {
        date: specificDate,
    };

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const onChangeSpecific = (event, selectedDate) => {
        const currentDate = selectedDate || specificDate;
        setSpecificDate(currentDate);
    };

    const onChangeReminderTime = (event, selectedDate) => {
        const currentDate = selectedDate || reminderTime;
        setReminderTime(currentDate);
    };

    const handleHabitCreation = async () => {
        setLoading(true);

        const newHabit = {
            name: habitName,
            id: Math.floor(Math.random() * 1000),
            color: updatedColor,
            icon: habitIcon,
            days: isEnabled ? daysCount : null,
            times: isEnabled ? timesCount : null,
            specificDate: isEnabledSpecific ? specificDate : null,
            reminder: isEnabledDate ? reminderTime : null,
            unitValue: selectedValue,
            description: description,
            completedDay: null,
            currentDay: 0,
            completed: false,
            completedDates: {},
            timesCompleted: 0,
            progress: 0,
            notificationId: Math.floor(Math.random() * 1000).toString(),
        };

        const repeats = daysCount > 1 ? true : false;

        try {
            CRUDHabits(newHabit);
            if (isEnabledDate) schedulePushNotification(content, trigger, repeats);
            if (isEnabledSpecific)
                schedulePushNotification(contentSpecific, triggerSpecific, false);
            setTimeout(() => {
                setLoading(false);
                navigation.navigate('MainTab');
            }, 2000);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <MainContainer>
            <CreateHabitHeader>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={32} color="white" />
                </TouchableOpacity>
                <Text twentyTwo fontFamily="Extra">
                    Create Habit
                </Text>
                <TouchableOpacity onPress={handleHabitCreation}>
                    {loading ? (
                        <ActivityIndicator color={colors.mainGreen} />
                    ) : (
                        <Text color={colors.mainGreen}>Create</Text>
                    )}
                </TouchableOpacity>
            </CreateHabitHeader>
            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitCentered>
                        <HabitDescriptionInput
                            autoCorrect={false}
                            value={description}
                            multiline={true}
                            placeholder="Habit Description"
                            placeholderTextColor="gray"
                            style={{
                                color: 'white',
                                fontSize: 17,
                                fontFamily: 'SemiBold',
                                ...habitBoxShadow,
                            }}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </HabitCentered>
                    <HabitUtilityInfoContainer>
                        <Text left marginLeft="5px" fontFamily="Regular">
                            Color
                        </Text>
                        <SelectHabitColorButton onPress={() => setModalVisible(true)}>
                            {!colorUpdated ? (
                                <Feather name="chevron-down" size={28} color="white" />
                            ) : (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: updatedColor,
                                    }}
                                />
                            )}
                        </SelectHabitColorButton>
                        <FrequencySwitchContainer>
                            <Text fontFamily="Regular">Remind at a location</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={isEnabledLocation ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchLocation}
                                value={isEnabledLocation}
                            />
                        </FrequencySwitchContainer>
                        <FrequencySwitchContainer>
                            <Text fontFamily="Regular">Remind on a specific date</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={isEnabledSpecific ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchSpecific}
                                value={isEnabledSpecific}
                            />
                        </FrequencySwitchContainer>
                        {isEnabledSpecific && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={specificDate}
                                mode="datetime"
                                is24Hour="true"
                                display="default"
                                themeVariant="dark"
                                onChange={onChangeSpecific}
                            />
                        )}
                        <FrequencySwitchContainer>
                            <Text fontFamily="Regular">Repeat</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </FrequencySwitchContainer>
                        {isEnabled && (
                            <>
                                <FrequencyTouchable>
                                    <Text>Days per Week</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            daysCount > 1 && setDaysCount(daysCount - 1);
                                        }}
                                    >
                                        <Feather name="minus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                    <Text fontFamily="Bold" twentyEight>
                                        {daysCount === 7 ? <Text>Every day</Text> : daysCount}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => daysCount < 7 && setDaysCount(daysCount + 1)}
                                    >
                                        <Feather name="plus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                </FrequencyTouchable>
                                <FrequencyTouchable>
                                    <RNPickerSelect
                                        textInputProps={{
                                            fontSize: 18,
                                            color: 'white',
                                            marginTop: 3,
                                        }}
                                        placeholder={placeholder}
                                        onValueChange={(value) => setSelectedValue(value)}
                                        items={[
                                            { label: 'times', value: 'times' },
                                            { label: 'glasses', value: 'glasses' },
                                            { label: 'minutes', value: 'minutes' },
                                            { label: 'hours', value: 'hours' },
                                            { label: 'kilometers', value: 'kilometers' },
                                            { label: 'bottles', value: 'bottles' },
                                        ]}
                                    />
                                    <Text>Per day</Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            timesCount > 1 && setTimesCount(timesCount - 1)
                                        }
                                    >
                                        <Feather name="minus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                    <Text fontFamily="Bold" twentyEight>
                                        {timesCount}
                                    </Text>
                                    <TouchableOpacity onPress={() => setTimesCount(timesCount + 1)}>
                                        <Feather name="plus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                </FrequencyTouchable>
                            </>
                        )}
                        <FrequencySwitchContainer>
                            <Text fontFamily="Regular">Reminder</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={isEnabledDate ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchDate}
                                value={isEnabledDate}
                            />
                        </FrequencySwitchContainer>
                        {isEnabledDate && (
                            <DateTimePicker
                                value={reminderTime}
                                mode="time"
                                themeVariant="dark"
                                is24Hour="true"
                                onChange={onChangeReminderTime}
                            />
                        )}
                    </HabitUtilityInfoContainer>
                </HabitInfoContainer>
                <ColorPalletteModal
                    updateColor={updateColor}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
                <Modalize
                    ref={modalizeRef}
                    closeSnapPointStraightEnabled={false}
                    scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    snapPoint={700}
                    modalStyle={{ backgroundColor: colors.mainBackground, marginTop: 100 }}
                    HeaderComponent={
                        <View
                            style={{
                                height: 70,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    backgroundColor: '#181818',
                                    width: '90%',
                                    height: 40,
                                    borderRadius: 15,
                                    paddingHorizontal: 10,
                                }}
                            >
                                <Text left fontFamily="Bold">
                                    Search...
                                </Text>
                            </View>
                        </View>
                    }
                >
                    <MapModal />
                </Modalize>
            </ScrollView>
        </MainContainer>
    );
}
