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
    const [selected, setSelected] = useState('Habits');
    const { routes } = state;
    const renderColor = (currentTab) => (currentTab === selected ? '#2eb284' : 'white');

    const todayIcon = <Feather name="calendar" size={24} color="black" />;

    const handlePress = (activeTab) => {
        setSelected(activeTab);
        navigation.navigate(activeTab);
    };

    return (
        <TabBarContainer style={tabBarShadow}>
            <TabBarAddContainer>
                {selected === 'Habits' && (
                    <TabAddButton
                        onPress={() => {
                            haptics.selection();
                            navigation.navigate('StartHabitCreation');
                        }}
                    >
                        <Feather name="plus" size={36} color="white" />
                    </TabAddButton>
                )}
            </TabBarAddContainer>
            {routes.map((route) => (
                <>
                    <Tab
                        key={route.key}
                        tab={route}
                        onPress={() => handlePress(route.name)}
                        color={renderColor(route.name)}
                        icon={todayIcon}
                    />
                </>
            ))}
        </TabBarContainer>
    );
};

export default CustomTabBar;
