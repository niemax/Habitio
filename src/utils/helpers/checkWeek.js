import { getCurrentWeek } from './currentDate';

/**
 * ? Checks if the week in the habit data structure
 * ? is lower than the current real-time week -> set completedPercentage to 0
 * ? and change data structure week to current week.
 * ? completedPercentage is tracked based on users weekly completion rate
 */

const calculateCompletionRate = (completedAmount, amountOfDays) => {
    const completedLength = Object.keys(completedAmount).length;
    const rate = (completedLength / amountOfDays) * 100;
    return rate;
};

const checkCurrentWeek = (dataCurrentWeek, completedDates, days, data) => {
    let completedPercentage;

    if (getCurrentWeek() > dataCurrentWeek) {
        completedPercentage = 0;
        data.dataCurrentWeek = getCurrentWeek();
    }

    completedPercentage = calculateCompletionRate(completedDates, days);

    return { completedPercentage };
};

export default checkCurrentWeek;
