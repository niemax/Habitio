import React from 'react';
import TextStyle from '../../utils/Text';
import { Feather } from '@expo/vector-icons';
import { LeftAction, RightAction } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { haptics } from '../../utils/helpers/haptics';

export const LeftActions = ({ item }) => (
    <LeftAction style={{ backgroundColor: item.completed ? colors.error : colors.mainGreen }}>
        {item.completed ? (
            <Feather name="x" size={48} color="white" style={{ marginLeft: 70 }} />
        ) : (
            <Feather name="check" size={42} color="white" style={{ marginLeft: 90 }} />
        )}
    </LeftAction>
);

export const RightActions = ({ swipeableRef, prog, setProg, item }) => (
    <>
        <RightAction
            onPress={() => {
                haptics.selection();
                swipeableRef.current.close();
                setProg((prevProg) => prevProg + 1);
            }}
            style={{ backgroundColor: item.color }}
        >
            <TextStyle fontFamily="SemiBold" twentyEight>
                +1
            </TextStyle>
        </RightAction>
        <RightAction
            onPress={() => {
                haptics.selection();
                swipeableRef.current.close();
                prog > 0 && setProg((prevProg) => prevProg - 1);
            }}
            style={{ backgroundColor: item.color, marginRight: 7 }}
        >
            <TextStyle fontFamily="SemiBold" twentyEight>
                -1
            </TextStyle>
        </RightAction>
        {item.times > 10 && (
            <RightAction
                onPress={() => {
                    haptics.selection();
                    swipeableRef.current.close();
                    prog <= item.times && setProg((prevProg) => prevProg + 5);
                }}
                style={{ backgroundColor: item.color, marginRight: 7 }}
            >
                <TextStyle twentyEight fontFamily="SemiBold">
                    +5
                </TextStyle>
            </RightAction>
        )}
        {item.times > 10 && (
            <RightAction
                onPress={() => {
                    haptics.selection();
                    swipeableRef.current.close();
                    prog <= item.times && setProg((prevProg) => prevProg - 5);
                }}
                style={{ backgroundColor: item.color, marginRight: 7 }}
            >
                <TextStyle twentyEight fontFamily="SemiBold">
                    -5
                </TextStyle>
            </RightAction>
        )}
    </>
);
