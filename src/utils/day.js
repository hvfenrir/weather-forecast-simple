import dayjs from "dayjs";
import { range, reduce } from "lodash-es";

export const getDaysOfWeek = (maxDays) => {
  const today = dayjs().day();
  const dayOfWeekFromToday = reduce(range(1, maxDays), (result, num) => {
    const day = result[num - 1] + 1;

    result.push(day > 6 ? 0 : day);

    return result;
  }, [today]);

  return dayOfWeekFromToday;
}