import { themeTools } from 'native-base';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const deviceWidth = Dimensions.get('window').width;

const radius = '18px';

export const HomeheaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const HomepageTextContainer = styled.View`
    margin-top: 50px;
    flex-direction: column;
`;

export const TabContainer = styled.View`
    padding-horizontal: 140px;
    justify-content: center;
    align-items: center;
`;

export const TabBarContainer = styled.View`
    background-color: #202020;
    opacity: 0.99;
    justify-content: space-evenly;
    align-items: center;
    height: 74px;
    width: 92%;
    position: absolute;
    bottom: 13px;
    left: 14px;
    right: 14px;
    flex-direction: row;
    elevation: 0;
    border-radius: 15px;
`;

export const TabBarAddContainer = styled.View`
    position: absolute;
    top: -25px;
    left: 140px;
    right: 140px;
    justify-content: center;
    align-items: center;
`;
export const TextInputContainer = styled.View`
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`;

export const ModalView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const HabitInput = styled.TextInput`
    width: ${deviceWidth - 50}px
    height: 50px
    border-radius: 10px; 
    padding: 15px;
`;

export const ButtonContainer = styled.View`
    position: absolute;
    bottom: 25px;
    left: 20px;
    right: 20px;
    justify-content: center;
    align-items: center;
`;

export const ImageContainer = styled.View`
    width: 100%;
    height: 130px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

export const ChevronTextContainer = styled.View`
    flex-direction: column;
    margin-top: 10px;
`;

export const HabitCardsContainer = styled.View`
    width: ${deviceWidth - 20}px;
    border-radius: 10px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
`;

export const HabitTextColumnContainer = styled.View`
    flex-direction: column;
`;

export const CreateHabitHeader = styled.View`
    margin-top: 48px;
    flex-direction: row;
    justify-content: space-between;
`;

export const HabitInfoContainer = styled.View`
    flex: 1;
    padding-horizontal: 8px;
    margin-bottom: 50px;
`;

export const HabitCentered = styled.View`
    justify-content: center;
    align-items: center;
`;

export const HabitDescriptionInput = styled.TextInput`
    height: 60px;
    padding: 10px;
    border-radius: 8px;
    margin-top: 13px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const DiaryInput = styled.TextInput`
    padding: 15px;
    margin-top: 10px;
    justify-content: center;
`;

export const HabitUtilityInfoContainer = styled.View`
    justify-content: center;
    padding-horizontal: 2px;
    justify-content: center;
    margin-top: 10px;
`;

export const SelectHabitColorButton = styled.View``;

export const FrequencyTouchable = styled.View`
    border-radius: 7px;
    margin-top: 15px;
    padding-horizontal: 10px;
    padding-vertical: 3px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const FrequencySelector = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    padding-vertical: 10px;
    padding-horizontal: 5px;
    border-radius: 5px;
    margin-vertical: 1px;
`;

export const FrequencySwitchContainer = styled.View`
    margin-top: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-vertical: 2px;
`;

export const HomepageDataView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const HomepageDataBox = styled.TouchableOpacity`
    margin-top: 2px;
    height: 84px;
    width: ${deviceWidth - 30} 
    padding-horizontal: 13px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${radius};
`;

export const ShowHabitFrequency = styled.View`
    margin-top: 50px;
    flex-direction: row;
`;
export const ShowFrequencyContainer = styled.View``;

export const LineBreak = styled.View`
    margin-left: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 1px;
    background-color: #494949;
    opacity: 0.3;
    width: 91%;
`;

export const ShowHabitActionsContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 45px;
`;

export const ShowHabitActionsAddContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

export const CalendarFrequencyContainer = styled.View`
    margin-bottom: 20px;
    margin-top: 25px;
`;

export const CalendarTimesInfoContainer = styled.View`
    opacity: 0.9
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    padding-horizontal: 18px;
    margin-bottom: 20px;
    padding-vertical: 20px;
    height: 150px;
`;

export const CalendarTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between
    margin-top: 15px;
    margin-bottom: 5px;
`;

export const CalendarStatsContainer = styled.View`
    margin-bottom: 20px;
    margin-top: 20px;
    align-items: center;
`;

export const CalendarLineBreak = styled.View`
    height: 1px;
    background-color: #494949;
    opacity: 0.1;
    width: 100%;
`;

export const VerticalLineBreak = styled.View`
    height: 90px;
    background-color: gray;
    width: 2px;
`;

export const CalendarHeader = styled.View`
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 12px;
`;

export const HomepageImageView = styled.View`
    flex-direction: row;
    position: absolute;
    justify-content: space-between;
    bottom: 40px;
    margin-left: 25px;
`;

export const NoHabitsContainer = styled.View`
    margin-top: 70px;
    justify-content: center;
    align-items: center;
`;

export const ProgressBarContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

export const LottieContainer = styled.View``;

export const AddDiaryModalHeaderContainer = styled.View`
    height: 70px;
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 8px;
    margin-top: 5px;
`;

export const LeftAction = styled.View`
    width: 350px;
    margin-top: 13px;
    border-radius: 15px;
    justify-content: center;
    align-items: flex-start;
`;

export const ItemTimesContainer = styled.TouchableOpacity`
    position: absolute;
    right: 30px;
`;

export const DateTimePickerView = styled.View`
    margin-top: 10px;
    margin-bottom: 4px;
`;

export const HabitHeaderLineBreak = styled.View`
    height: 0.4px;
    width: 100%;
    background-color: gray;
    opacity: 0.3;
    margin-top: 10px;
`;

export const AddProgressButton = styled.TouchableOpacity`
    width: 100%;
    height: 30px;
    justify-content: space-between;
    margin-top: 9px;
`;

export const PopableLineBreak = styled.View`
    background-color: gray;
    margin-top: 3px;
    opacity: 0.3;
    height: 1px;
    width: 100%;
`;
