import { getCurrentWeek } from './dateHelpers';

/**
 * ? Checks if the week in the habit data structure
 * ? is lower than the current real-time week -> set completedPercentage to 0
 * ? and change data structure week to current week.
 * ? completedPercentage is tracked based on users weekly completion rate
 */

const calculateCompletionRate = (completedAmount, daysWeekly) => {
    const completedLength = Object.keys(completedAmount).length;
    const rate = (completedLength / daysWeekly) * 100;
    return rate;
};

const checkCurrentWeek = (dataCurrentWeek, completedDates, days, data) => {
    let completedPercentage;

    if (getCurrentWeek() > dataCurrentWeek) {
        completedPercentage = 0;
        data.dataCurrentWeek = getCurrentWeek();
    } else {
        completedPercentage = calculateCompletionRate(completedDates, days);
    }

    return completedPercentage;
};

export default checkCurrentWeek;
