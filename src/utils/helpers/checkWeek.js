import { getWeek } from 'date-fns';

const checkCurrentWeek = (dataCurrentWeek, completedDates, days, data) => {
    const week = getWeek(new Date());
    let completedPercentage;

    const completedLength = Object.keys(completedDates).length;
    const completionRate = (completedLength / days) * 100;

    if (week > dataCurrentWeek) {
        completedPercentage = 0;
        data.dataCurrentWeek = week;
    } else if (week === dataCurrentWeek) {
        completedPercentage = completionRate;
    }

    console.log(data);
    return { completedPercentage };
};

export default checkCurrentWeek;
