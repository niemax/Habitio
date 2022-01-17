export const calculateCompletionRate = (completedDatesAmount, daysWeekly) => {
    const completedLength = Object.keys(completedDatesAmount).length;
    const rate = (completedLength / daysWeekly) * 100;
    return rate;
};
