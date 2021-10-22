import React, { useState } from 'react';
import { tabBarShadow } from '../../utils/globalStyles';
import { Feather } from '@expo/vector-icons';
import {
    TabAddButton,
    TabBarAddContainer,
    TabBarContainer,
} from '../../utils/StyledComponents/Styled';
import Tab from '../../components/tabNavComponents/Tab';

const CustomTabBar = ({ state, navigation }) => {
    const [selected, setSelected] = useState('Habits');
    const { routes } = state;
    const renderColor = (currentTab) => (currentTab === selected ? '#2eb284' : 'gray');

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
                            navigation.navigate('StartHabitCreation');
                        }}
                    >
                        <Feather name="plus" size={36} color="white" />
                    </TabAddButton>
                )}
            </TabBarAddContainer>
            {routes.map((route) => (
                <Tab
                    key={route.key.toString()}
                    tab={route}
                    onPress={() => handlePress(route.name)}
                    color={renderColor(route.name)}
                    icon={route.params.icon}
                />
            ))}
        </TabBarContainer>
    );
};

export default CustomTabBar;
