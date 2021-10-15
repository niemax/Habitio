import React from 'react';
import { ActivityIndicator, ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import {
    FrequencySwitchContainer,
    FrequencyTouchable,
    HabitCentered,
    HabitDescriptionInput,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    HomeheaderContainer,
    ModalContent,
    SelectHabitColorButton,
} from '../../utils/StyledComponents/Styled';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons, Feather } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import { habitBoxShadow } from '../../utils/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../ColorPalletteModal';
import { useRef } from 'react';

export default function HabitEditContent(props) {
    const placeholder = {
        label: props.unitValue,
        value: null,
        color: '#9EA0A4',
    };

    const sheetRef = useRef(null);

    return (
        <ModalContent>
            <HomeheaderContainer>
                <TouchableOpacity
                    style={{ marginLeft: 10, marginTop: 10 }}
                    onPress={() => props.setEditHabitModalVisible(false)}
                >
                    <Ionicons name="close-circle-sharp" size={34} color="gray" />
                </TouchableOpacity>
                <Text twentyTwo fontFamily="Extra">
                    Edit Habit
                </Text>
                <TouchableOpacity onPress={props.handleSubmit}>
                    <Text marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                        {props.loading ? (
                            <ActivityIndicator color={colors.mainGreen} />
                        ) : (
                            <Text color={colors.mainGreen}>Update</Text>
                        )}
                    </Text>
                </TouchableOpacity>
            </HomeheaderContainer>

            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {props.habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitCentered>
                        <HabitDescriptionInput
                            keyboardAppearance="dark"
                            multiline={true}
                            autoCorrect={false}
                            placeholder={props.stateDescription}
                            placeholderTextColor="gray"
                            style={{
                                color: 'white',
                                fontSize: 17,
                                fontFamily: 'Bold',
                                ...habitBoxShadow,
                            }}
                            onChangeText={(text) => props.setStateDescription(text)}
                        />
                    </HabitCentered>
                    <HabitUtilityInfoContainer>
                        <Text left fontFamily="Regular">
                            Color
                        </Text>
                        <SelectHabitColorButton onPress={() => sheetRef.current.show()}>
                            {!props.colorUpdated ? (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: props.color,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: props.updatedColor,
                                    }}
                                />
                            )}
                        </SelectHabitColorButton>

                        <FrequencySwitchContainer>
                            <Text fontFamily="Regular">Complete once</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={props.isEnabledSpecific ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={props.toggleSwitchSpecific}
                                value={props.isEnabledSpecific}
                            />
                        </FrequencySwitchContainer>
                        {props.isEnabledSpecific && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={props.habitSpecificDate}
                                mode="datetime"
                                is24Hour="true"
                                display="default"
                                themeVariant="dark"
                                onChange={props.onChangeSpecific}
                            />
                        )}
                        <FrequencySwitchContainer>
                            <Text fontFamily="Regular">Repeat</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={props.isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={props.toggleSwitch}
                                value={props.isEnabled}
                            />
                        </FrequencySwitchContainer>
                        {props.isEnabled && (
                            <>
                                <FrequencyTouchable>
                                    <Text>Days per Week</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.daysCount > 1 &&
                                                props.setDaysCount(props.daysCount - 1);
                                        }}
                                    >
                                        <Feather name="minus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                    <Text fontFamily="Bold" twentyEight>
                                        {props.daysCount === 7 ? (
                                            <Text>Every day</Text>
                                        ) : (
                                            props.daysCount
                                        )}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            props.daysCount < 7 &&
                                            props.setDaysCount(props.daysCount + 1)
                                        }
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
                                        onValueChange={(value) => props.setHabitUnitValue(value)}
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
                                            props.timesCount > 1 &&
                                            props.setTimesCount(props.timesCount - 1)
                                        }
                                    >
                                        <Feather name="minus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                    <Text fontFamily="Bold" twentyEight>
                                        {props.timesCount}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => props.setTimesCount(props.timesCount + 1)}
                                    >
                                        <Feather name="plus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                </FrequencyTouchable>
                            </>
                        )}
                        <FrequencySwitchContainer>
                            <Text fontFamily="Regular">Reminder</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={props.isEnabledDate ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={props.toggleSwitchDate}
                                value={props.isEnabledDate}
                            />
                        </FrequencySwitchContainer>
                        {props.isEnabledDate && (
                            <DateTimePicker
                                value={props.habitReminderTime}
                                mode="time"
                                themeVariant="dark"
                                is24Hour="true"
                                onChange={props.onChangeReminderTime}
                            />
                        )}
                    </HabitUtilityInfoContainer>
                </HabitInfoContainer>
                <ActionSheet
                    containerStyle={{
                        backgroundColor: '#141414',
                        height: 270,
                    }}
                    defaultOverlayOpacity={0.6}
                    gestureEnabled="true"
                    elevation={2}
                    ref={sheetRef}
                >
                    <ColorPalletteModal sheetRef={sheetRef} updateColor={props.updateColor} />
                </ActionSheet>
            </ScrollView>
        </ModalContent>
    );
}
