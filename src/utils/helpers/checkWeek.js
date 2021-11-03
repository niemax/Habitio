import { getWeek } from 'date-fns';

/**
 * ? Checks if the week in the habit data structure
 * ? is lower than the current real-time week -> set completedPercentage to 0
 * ? and change data structure week to current week.
 * ? completedPercentage is tracked based on users weekly completion rate
 */
const checkCurrentWeek = (dataCurrentWeek, completedDates, days, data) => {
    const week = getWeek(new Date());
    let completedPercentage;

    const completedLength = Object.keys(completedDates).length;
    const completionRate = (completedLength / days) * 100;

    if (week > dataCurrentWeek) {
        completedPercentage = 0;
        data.dataCurrentWeek = week;
    }

    if (week === dataCurrentWeek) {
        completedPercentage = completionRate;
    }

    return { completedPercentage };
};

export default checkCurrentWeek;
