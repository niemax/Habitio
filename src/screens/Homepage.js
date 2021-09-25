import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
    HomeheaderContainer,
    HomepageTextContainer,
    MainContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { colors } from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Homepage({ navigation }) {
    /* const [date, setDate] = useState('');

    useEffect(() => {
        const { date } = getCurrentDate();
        setDate(date);
    }, [date]); */

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@habit');
            console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <MainContainer>
            <HomeheaderContainer>
                <HomepageTextContainer>
                    <Text left twentyEight fontFamily="Bold" marginLeft="15px">
                        Dashboard for
                    </Text>
                    <Text
                        twenty
                        color={colors.mainGreen}
                        fontFamily="SemiBold"
                        left
                        marginLeft="15px"
                    >
                        26. syyskuuta, 2021
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
