import { isNumber, range, reduce } from "lodash-es";

export const getDaysOfWeek = (dayFrom = 0, maxDays) => {
  if (!isNumber(maxDays) || maxDays < 0 || !isNumber(dayFrom) || dayFrom < 0) return [];

  const maxRangeDays =  maxDays > 7 ? 7 : maxDays;

  const dayOfWeekFromToday = reduce(range(1, maxRangeDays), (result, num) => {
    const day = result[num - 1] + 1;

    result.push(day > 6 ? 0 : day);

    return result;
  }, [dayFrom]);

  return dayOfWeekFromToday;
}