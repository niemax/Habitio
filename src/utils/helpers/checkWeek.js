import { getWeek } from 'date-fns';

const checkCurrentWeek = (dataCurrentWeek, completedDates, days) => {
    const week = getWeek(new Date());
    let completedPercentage;

    const completedLength = Object.keys(completedDates).length;
    const completionRate = (completedLength / days) * 100;
    console.log(completedLength);

    if (week > dataCurrentWeek) {
        completedPercentage = 0;
    } else {
        completedPercentage = completionRate;
    }

    return { completedPercentage };
};

export default checkCurrentWeek;
