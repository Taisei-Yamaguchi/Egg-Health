import { DynamicDetail } from "@/interfaces/user_detail.inteface";

// generate continus dates
export const generateContinuousDates = (data: DynamicDetail[], period: string) => {
    const dates = [];
    const endDate = new Date();
    let startDate = new Date();

    switch (period) {
        case '2weeks':
            startDate.setDate(endDate.getDate() - 14);
            break;
        case '1month':
            startDate.setMonth(endDate.getMonth() - 1);
            break;
        case '3months':
            startDate.setMonth(endDate.getMonth() - 3);
            break;
        case '6months':
            startDate.setMonth(endDate.getMonth() - 6);
            break;
        case '12months':
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
        case '24months':
            startDate.setFullYear(endDate.getFullYear() - 2);
            break;
        default:
            startDate.setDate(endDate.getDate() - 14);
    }
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};


// fill missing dates
export const fillMissingDates = (data: DynamicDetail[], period: string) => {
    const continuousDates = generateContinuousDates(data, period);
    const dataByDate = new Map(data.map(item => [item.date, item]));

    const newData = continuousDates.map(date => ({
        date: date.toISOString().slice(0, 10), // 日付をISO形式から文字列に変換
        ...dataByDate.get(date.toISOString().slice(0, 10)), 
    }));
    return newData;
};