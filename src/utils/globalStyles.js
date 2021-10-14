import { colors } from './colors';

export const textInputStyling = {
    color: '#FFF',
    fontSize: 20,
};

export const textInputPlaceholderColor = {
    color: '#FFF',
};

export const tabBarOptions = {
    showLabel: false,
    style: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        background: 'black',
        borderRadius: 15,
        height: 90,
    },
};

export const tabBarShadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
};

export const habitBoxShadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
};

export const createHabitColorIndicator = {
    width: 35,
    height: 35,
    borderRadius: '50%',
};

export const showHabitImageBackground = {
    backgroundColor: '#181818',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 15,
};

export const calendarStyles = {
    calendarBackground: colors.mainBackground,
    textDayFontFamily: 'Regular',
    arrowColor: colors.mainGreen,
    textMonthFontFamily: 'Medium',
    textDayHeaderFontFamily: 'SemiBold',
    monthTextColor: 'white',
    dayTextColor: 'white',
    todayTextColor: colors.mainGreen,
    indicatorColor: colors.mainGreen,
    selectedDayBackgroundColor: colors.mainGreen,
    textDayFontSize: 20,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 14,
    dotColor: 'transparent',
};

export const noHabitsImageStyle = {
    width: 150,
    height: 150,
    marginTop: 10,
};

export const homepageBoxShadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
};
