import React from 'react';
import styled from 'styled-components/native';

const TextStyle = ({ ...props }) => {
    return <Text {...props}>{props.children}</Text>;
};

const Text = styled.Text`
    margin: ${(props) => props.margin ?? 0};
    padding: ${(props) => props.padding ?? 0};
    /* prettier-ignore */
    marginLeft: ${(props) => props.marginLeft ?? 0};
    /* prettier-ignore */
    marginRight: ${(props) => props.marginRight ?? 0};
    /* prettier-ignore */
    marginTop: ${(props) => props.marginTop ?? 0};
    opacity: ${(props) => props.opacity ?? 1};
    /* prettier-ignore */
    marginBottom: ${(props) => props.marginBottom ?? 0};
    /* prettier-ignore */
    fontFamily: ${(props) => props.fontFamily ?? 'SemiBold'};
    color: ${(props) => props.color ?? '#FFF'}
        ${({
            twelve,
            fifteen,
            sixteen,
            nineteen,
            twenty,
            twentyFour,
            twentyEight,
            thirtyFour,
            twentyTwo,
        }) => {
            switch (true) {
                case thirtyFour:
                    return `font-size: 30px`;

                case twentyEight:
                    return `font-size: 28px`;

                case twentyTwo:
                    return `font-size: 22px`;

                case twentyFour:
                    return `font-size: 24px`;

                case twenty:
                    return `font-size: 20px`;

                case nineteen:
                    return `font-size: 19px`;

                case sixteen:
                    return `font-size: 16px`;

                case fifteen:
                    return `font-size: 15px`;

                case twelve:
                    return `font-size: 12px`;

                default:
                    return `font-size: 18px`;
            }
        }}
        ${({ center, right, left }) => {
            switch (true) {
                case center:
                    return `text-align: center`;

                case right:
                    return `text-align: right`;

                case left:
                    return `text-align: left`;

                default:
                    return `text-align: center`;
            }
        }};
`;

export default TextStyle;
