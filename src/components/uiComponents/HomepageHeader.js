import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import Text from '../../utils/Text';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
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

    return (
        <HomeheaderContainer>
            <HomepageTextContainer>
                <Text left twentyEight fontFamily="Bold" marginLeft="15px">
                    Hello,{' '}
                    {name ? (
                        <Text color={colors.mainGreen} left twentyEight fontFamily="Extra">
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
                                    height={30}
                                    borderRadius={6}
                                />
                            ) : (
                                'Stranger'
                            )}
                        </Text>
                    )}
                </Text>
                <View style={{ marginTop: 20 }} />
                <Text left twenty fontFamily="Extra" marginLeft="15px">
                    Dashboard for
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
