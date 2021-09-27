import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import ShowHabitModal from '../components/ShowHabitModal';
import { colors } from '../utils/colors';
import getCurrentDate from '../utils/helpers/currentDate';
import { haptics } from '../utils/helpers/haptics';
import {
    HomeheaderContainer,
    HomepageDataBox,
    HomepageDataView,
    HomepageTextContainer,
    MainContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';

export default function Homepage() {
    const [habitData, setHabitData] = useState({});
    const [visibleItem, setVisibleItem] = useState();
    /*   const [date, setDate] = useState('');

    useEffect(() => {
        const { date } = getCurrentDate();
        setDate(date);
    }, [date]); */

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@habit');
            const parsedValue = JSON.parse(jsonValue);
            if (parsedValue !== null) setHabitData(parsedValue);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getData(); //        AsyncStorage.removeItem('@habit');
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
            <HomepageDataView>
                {habitData !== null &&
                    Object.values(habitData).map((item, index) => {
                        console.log(item);
                        const id = index.toString();
                        return (
                            <HomepageDataBox
                                key={id}
                                onPress={() => {
                                    setVisibleItem(id);
                                    haptics.selection();
                                }}
                                style={{ borderBottomWidth: 7, borderBottomColor: `${item.color}` }}
                            >
                                <Image style={{ height: 50, width: 50 }} source={item.icon} />
                                <Text fontFamily="SemiBold" marginLeft="5px">
                                    {item.name}
                                </Text>

                                <ShowHabitModal
                                    data={item}
                                    modalVisible={visibleItem === id}
                                    setModalVisible={setVisibleItem}
                                />
                            </HomepageDataBox>
                        );
                    })}
            </HomepageDataView>
        </MainContainer>
    );
}
