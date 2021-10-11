import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
    ToolTipActionButton,
    ToolTipLineBreak,
    ToolTipView,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { colors } from '../utils/colors';

export default function TooltipBlurView({ data, handleDoneToday }) {
    return (
        <ToolTipView>
            <ToolTipActionButton onPress={() => handleDoneToday(data)}>
                {!data.completed ? (
                    <Text sixteen>Done for Today</Text>
                ) : (
                    <Text left color={colors.error}>
                        Undo
                    </Text>
                )}
                <Feather
                    name="check"
                    size={20}
                    color={colors.mainGreen}
                    style={{ marginLeft: 5 }}
                />
            </ToolTipActionButton>
            <ToolTipLineBreak />
            <ToolTipActionButton>
                <Text sixteen>Show details</Text>
                <Feather name="calendar" size={20} color="white" style={{ marginLeft: 25 }} />
            </ToolTipActionButton>
        </ToolTipView>
    );
}
