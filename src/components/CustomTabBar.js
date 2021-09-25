import React, { useState } from 'react';
import { tabBarShadow } from '../utils/globalStyles';
import { Feather } from '@expo/vector-icons';
import {
    TabAddButton,
    TabBarAddContainer,
    TabBarContainer,
} from '../utils/StyledComponents/Styled';
import Tab from './Tab';
import { haptics } from '../utils/helpers/haptics';

const CustomTabBar = ({ state, navigation }) => {
    const [selected, setSelected] = useState('Home');
    const [modalVisible, setModalVisible] = useState(false);
    const { routes } = state;
    const renderColor = (currentTab) => (currentTab === selected ? '#2eb284' : 'white');

    const handlePress = (activeTab) => {
        setSelected(activeTab);
        navigation.navigate(activeTab);
    };

    return (
        <TabBarContainer style={tabBarShadow}>
            <TabBarAddContainer>
                {selected === 'Home' && (
                    <TabAddButton
                        onPress={() => {
                            haptics.selection();
                            navigation.navigate('FirstHabitModal');
                        }}
                    >
                        <Feather name="plus" size={36} color="white" />
                    </TabAddButton>
                )}
            </TabBarAddContainer>
            {routes.map((route) => (
                <Tab
                    key={route.key}
                    tab={route}
                    onPress={() => handlePress(route.name)}
                    color={renderColor(route.name)}
                />
            ))}
        </TabBarContainer>
    );
};

export default CustomTabBar;
