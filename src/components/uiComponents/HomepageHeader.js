import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import Text from '../../utils/Text';
import { getHours } from 'date-fns';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { Feather } from '@expo/vector-icons';
import { HomeheaderContainer, HomepageTextContainer } from '../../utils/StyledComponents/Styled';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { getCurrentDateFormatted } from '../../utils/helpers/dateHelpers';

export const HomepageHeader = ({ name, loading }) => {
    const [currentDate, setCurrentDate] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        const { d } = getCurrentDateFormatted();
        setCurrentDate(d);
    }, []);

    const hourNow = getHours(new Date());

    const renderAppropriateGreeting = () => {
        let greetingText;

        if (hourNow >= 0 && hourNow < 12) {
            greetingText = (
                <Text left twentyEight fontFamily="Bold">
                    Morning
                </Text>
            );
        } else if (hourNow >= 12 && hourNow < 15) {
            greetingText = (
                <Text left twentyEight fontFamily="Bold">
                    Afternoon
                </Text>
            );
        } else {
            greetingText = (
                <Text left twentyEight fontFamily="Bold">
                    Evening
                </Text>
            );
        }
        return greetingText;
    };

    useEffect(() => {
        renderAppropriateGreeting();
    }, [hourNow]);

    return (
        <HomeheaderContainer>
            <HomepageTextContainer>
                <Text marginLeft="15px">
                    {renderAppropriateGreeting()},{' '}
                    {name ? (
                        <Text color={colors.mainGreen} twentyEight fontFamily="Extra">
                            {name}!
                        </Text>
                    ) : (
                        <Text twentyEight fontFamily="Extra" color={colors.mainGreen}>
                            {loading ? (
                                <ContentLoader
                                    height={20}
                                    width={40}
                                    speed={2}
                                    backgroundColor={'#333'}
                                    foregroundColor={'#999'}
                                    viewBox="0 0 280 70"
                                >
                                    <Rect x="0" y="15" rx="20" ry="10" width="400" height="200" />
                                </ContentLoader>
                            ) : (
                                ''
                            )}
                        </Text>
                    )}
                </Text>
                <Text
                    eighteen
                    color={colors.mainGreen}
                    fontFamily="SemiBold"
                    left
                    marginLeft="15px"
                >
                    Dashboard for {currentDate}
                </Text>
            </HomepageTextContainer>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Feather name="settings" size={28} color="white" style={{ marginRight: 10 }} />
            </TouchableOpacity>
        </HomeheaderContainer>
    );
};

export default HomepageHeader;
