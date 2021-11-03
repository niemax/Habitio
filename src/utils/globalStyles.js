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
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
};

export const createHabitColorIndicator = {
    width: 35,
    height: 35,
    borderRadius: '50%',
};

export const showHabitImageBackground = {
    marginTop: 20,
    backgroundColor: '#181818',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    padding: 15,
    borderRadius: 15,
};

export const showHabitImage = {
    width: 60,
    height: 60,
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
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
};

export const tabNavStyle = {
    activeTintColor: '#03fff7',
    inactiveTintColor: '#3b3b3b',
    showLabel: false,
    position: 'absolute',
    left: 15,
    right: 15,
    height: 75,
    width: '92%',
    borderRadius: 15,
    backgroundColor: '#141414',
    bottom: 10,
};

export const habitColor = {
    width: 35,
    height: 35,
    borderRadius: '50%',
};

export const showHabitTimerIndicator = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    height: 40,
    width: 125,
    backgroundColor: colors.mainBoxes,
    borderRadius: 15,
    marginBottom: 20,
};

export const colorPalletteView = {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
};

export const colorPalletteColor = {
    margin: 5,
    width: 32,
    height: 32,
    borderRadius: 100,
    marginVertical: 20,
};

export const progressBar = {
    position: 'absolute',
    bottom: 0,
    left: 2,
    right: 2,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
};
