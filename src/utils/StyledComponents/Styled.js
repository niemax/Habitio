import styled from 'styled-components/native';
import { colors } from '../colors';

const { mainBackground, mainGreen } = colors;

const radius = '15px';

export const MainContainer = styled.View`
    background-color: ${mainBackground};
    flex: 1;
`;

export const HomeheaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    background-color: #161616;
    justify-content: space-evenly;
    align-items: center;
    height: 80px;
    position: absolute;
    bottom: 25px;
    flex-direction: row;
    left: 20px;
    right: 20px;
    elevation: 0;
    border-radius: 15px;
`;

export const TabBarAddContainer = styled.View`
    position: absolute;
    top: -30px;
    left: 135px;
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
    justify-content: center;
    align-items: center;
    margin-top: 150px;
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
    margin-top: 48px;
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 12px;
    align-items: center;
`;

export const HabitInfoContainer = styled.View`
    flex: 1;
`;

export const HabitDescriptionInput = styled.TextInput`
    width: 360px;
    height: 100px;
    background-color: #383838;
    border-radius: 15px;
    padding: 15px;
    margin-top: 10px;
    margin-left: 15px;
`;

export const HabitUtilityInfoContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    margin-top: 15px;
`;

export const SelectHabitColorButton = styled.TouchableOpacity`
    justify-content: center;
    margin-left: 15px;
    margin-top: 10px;
    background-color: #191919;
    align-items: center;
    height: 70px;
    width: 70px;
    border-radius: 15px;
`;

export const ColorModalContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
`;

export const FrequencyTouchable = styled.TouchableOpacity`
    width: 360px;
    height: 60px;
    background-color: #383838;
    border-radius: 15px;
    padding: 15px;
    margin-top: 10px;
    margin-left: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
