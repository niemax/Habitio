import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
    HomeheaderContainer,
    HomepageTextContainer,
    MainContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import getCurrentDate from '../utils/helpers/currentDate';
import { TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

export default function Homepage({ navigation }) {
    const [date, setDate] = useState('');

    useEffect(() => {
        const { date } = getCurrentDate();
        setDate(date);
    }, [date]);

    return (
        <MainContainer>
            <HomeheaderContainer>
                <HomepageTextContainer>
                    <Text left twentyEight fontFamily="Bold" marginLeft="15px">
                        Dashboard for,
                    </Text>
                    <Text
                        twenty
                        color={colors.mainGreen}
                        fontFamily="SemiBold"
                        left
                        marginLeft="15px"
                    >
                        {date}
                    </Text>
                </HomepageTextContainer>
                <TouchableOpacity>
                    <Feather
                        name="settings"
                        size={28}
                        color="white"
                        style={{ marginTop: 35, marginRight: 10 }}
                    />
                </TouchableOpacity>
            </HomeheaderContainer>
        </MainContainer>
    );
}
