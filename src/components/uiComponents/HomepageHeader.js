import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import Text from '../../utils/Text';
import { getHours } from 'date-fns';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { Feather } from '@expo/vector-icons';
import { HomeheaderContainer, HomepageTextContainer } from '../../utils/StyledComponents/Styled';
import { getCurrentDateFormatted } from '../../utils/helpers/dateHelpers';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const HomepageHeader = ({ name, loading }) => {
    const [currentDate, setCurrentDate] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        const { date } = getCurrentDateFormatted();
        setCurrentDate(date);
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
                            {!loading ? (
                                <SkeletonPlaceholder.Item
                                    highlightColor="#F2F8FC"
                                    backgroundColor="gray"
                                    speed={1000}
                                    width={60}
                                    height={20}
                                    borderRadius={6}
                                />
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
                    {currentDate}
                </Text>
            </HomepageTextContainer>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Feather name="settings" size={28} color="white" style={{ marginRight: 10 }} />
            </TouchableOpacity>
        </HomeheaderContainer>
    );
};

export default HomepageHeader;
