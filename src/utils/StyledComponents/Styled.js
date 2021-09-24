import styled from 'styled-components/native';
import colors from '../colors';

const { mainBackground } = colors;

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

const radius = 200;

export const TabAddButton = styled.TouchableOpacity`
    height: 70px;
    width: 70px;
    justify-content: center;
    align-items: center;
    background-color: green;
    border-radius: ${radius};
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
