import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import Text from '../../utils/Text';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { Feather } from '@expo/vector-icons';
import { HomeheaderContainer, HomepageTextContainer } from '../../utils/StyledComponents/Styled';
import { getCurrentDate } from '../../utils/helpers/currentDate';

export const HomepageHeader = () => {
    const [currentDate, setCurrentDate] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        const { date } = getCurrentDate();
        setCurrentDate(date);
    }, []);

    return (
        <HomeheaderContainer>
            <HomepageTextContainer>
                <Text left twentyEight fontFamily="Extra" marginLeft="15px">
                    Dashboard for
                </Text>
                <Text twenty color={colors.mainGreen} fontFamily="SemiBold" left marginLeft="15px">
                    {currentDate}
                </Text>
            </HomepageTextContainer>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Feather
                    name="settings"
                    size={28}
                    color="white"
                    style={{ marginTop: 35, marginRight: 10 }}
                />
            </TouchableOpacity>
        </HomeheaderContainer>
    );
};

export default HomepageHeader;
