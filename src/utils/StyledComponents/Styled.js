import styled from 'styled-components/native';
import { colors } from '../colors';

const { mainBackground, mainGreen } = colors;

const radius = '15px';

export const SplashContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${colors.mainBackground};
`;
export const MainContainer = styled.View`
    background-color: ${mainBackground};
    flex: 1;
`;

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

export const TabAddButton = styled.TouchableOpacity`
    height: 70px;
    width: 70px;
    justify-content: center;
    align-items: center;
    background-color: green;
    border-radius: 200px;
    background: #2eb284;
`;
export const TabContainer = styled.View`
    padding-horizontal: 140px;
`;

export const TabBarContainer = styled.View`
    background-color: #191919;
    opacity: 0.99;
    justify-content: space-evenly;
    align-items: center;
    width: 92%;
    height: 80px;
    position: absolute;
    bottom: 11px;
    left: 14px;
    flex-direction: row;
    elevation: 0;
    border-radius: 15px;
`;

export const TabBarAddContainer = styled.View`
    position: absolute;
    top: -30px;
    left: 140px;
    justify-content: center;
    align-items: center;
`;
export const TextInputContainer = styled.View`
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`;

export const ModalView = styled.View``;

export const ModalContent = styled.View`
    flex: 1;
    background-color: ${mainBackground};
`;

export const InputContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const HabitInput = styled.TextInput`
    width: 342px;
    height: 60px
    background-color: #383838;
    border-radius: 15px;
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

export const HabitNextButton = styled.TouchableOpacity`
    width: 350px;
    height: 60px;
    background-color: ${mainGreen};
    justify-content: center;
    align-items: center;
    border-radius: ${radius};
`;

export const PreDefinedContainer = styled.View`
    justify-content: center;
    align-items: center;
`;
export const PreDefinedHabitsContainer = styled.View`
    background-color: #383838;
    width: 360px;
    height: 90px;
    border-radius: ${radius};
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
`;

export const HabitScreenContainer = styled.View`
    flex: 1;
    background-color: ${mainBackground};
    align-items: center;
`;

export const ImageContainer = styled.View`
    width: 100%;
    height: 160px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center
    background-color: #141414;
`;

export const ChevronTextContainer = styled.View`
    flex-direction: column;
    margin-top: 10px;
`;

export const HabitCardsContainer = styled.View`
    background-color: #292929;
    width: 360px;
    height: 90px;
    border-radius: ${radius};
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
`;

export const HabitTextColumnContainer = styled.View`
    flex-direction: column;
`;

export const CreateHabitHeader = styled.View`
    margin-top: 55px;
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 12px;
`;

export const HabitInfoContainer = styled.View`
    flex: 1;
`;

export const HabitCentered = styled.View`
    justify-content: center;
    align-items: center;
`;

export const HabitDescriptionInput = styled.TextInput`
    width: 360px;
    height: 100px;
    background-color: #383838;
    border-radius: ${radius};
    padding: 15px;
    margin-top: 10px;
    justify-content: center;
`;

export const DiaryInput = styled.TextInput`
    height: 120px;
    background-color: #383838;
    border-radius: ${radius};
    padding: 15px;
    margin-top: 10px;
    justify-content: center;
`;

export const HabitUtilityInfoContainer = styled.View`
    margin-top: 15px;
    justify-content: center;
    padding-horizontal: 10px;
`;

export const SelectHabitColorButton = styled.TouchableOpacity`
    justify-content: center;
    margin-top: 10px;
    background-color: #191919;
    align-items: center;
    height: 70px;
    width: 70px;
    border-radius: 15px;
`;

export const FrequencyTouchable = styled.View`
    width: auto;
    height: 60px;
    background-color: #383838;
    border-radius: 15px;
    padding: 15px;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const FrequencySwitchContainer = styled.View`
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 3px;
`;

export const HomepageDataView = styled.View`
    justify-content: center;
    align-items: center;
`;

export const HomepageDataBox = styled.Pressable`
    margin-top: 15px;
    height: 90px;
    width: 350px;
    background-color: #303030;
    border-radius: 15px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 15px;
`;

export const ShowHabitDataContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const ShowHabitHeader = styled.View``;

export const ShowHabitFrequency = styled.View`
    margin-top: 50px;
    flex-direction: row;
`;
export const ShowFrequencyContainer = styled.View``;

export const LineBreak = styled.View`
margin-left: 15px;
margin-top: 20px;
margin-bottom: 20px
    height: 1px;
    background-color: #494949;
    width: 300px;
`;

export const ToolTipLineBreak = styled.View`
    height: 0.6px;
    background-color: #494949;
    width: 300px;
`;

export const ShowHabitActionsContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 45px;
`;

export const ShowHabitActionsButton = styled.TouchableOpacity`
    width: 350px;
    height: 60px;
    background-color: #383838;
    justify-content: center;
    border-radius: 15px;
    padding: 15px;
    margin-top: 10px;
`;
export const ShowHabitActionsAddContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

export const ShowHabitActionsAddButton = styled.TouchableOpacity`
    width: 70px;
    height: 60px;
    justify-content: center;
    border-radius: 15px;
    margin-top: 10px;
`;

export const ShowHabitActionsButtonDelete = styled.TouchableOpacity`
    width: 350px;
    height: 60px;
    background-color: #f64141;
    justify-content: center;
    border-radius: 15px;
    padding: 15px;
    margin-top: 10px;
`;

export const CalendarTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between
    margin-top: 25px;
    padding-horizontal: 13px;
`;

export const CalendarStatsContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CalendarLineBreak = styled.View`
    height: 0.4px;
    width: 100%;
    background-color: gray;
`;

export const VerticalLineBreak = styled.View`
    height: 90px;
    background-color: gray;
    width: 2px;
`;

export const CalendarHeader = styled.View`
    margin-top: 35px;
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
    margin-top: 7px;
`;

export const CalendarTimesInfoContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 15px;
    margin-bottom: 10px;
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
    margin-top: 15px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;

export const ItemTimesContainer = styled.View`
    position: absolute;
    right: 30px;
`;
