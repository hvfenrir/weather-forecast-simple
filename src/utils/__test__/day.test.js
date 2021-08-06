import { getDaysOfWeek } from 'utils/day';

describe('Get days of week', () => {
  test('should return array of days start from Sunday', () => {
    // arr
    const dayFrom = 0;
    const maxDays = 6;
    const expectResult = [dayFrom, 1, 2, 3, 4, 5]
    
    // act
    const result = getDaysOfWeek(dayFrom, maxDays);

    // assert
    expect(result).toStrictEqual(expectResult);
  })

  test('should return array of days start from Friday and reset to 0 when meet Sunday', () => {
    // arr
    const dayFrom = 5;
    const maxDays = 6;
    const expectResult = [dayFrom, 6, 0, 1, 2, 3]
    
    // act
    const result = getDaysOfWeek(dayFrom, maxDays);

    // assert
    expect(result).toStrictEqual(expectResult);
  });

  test('should return array of 7 days when maxDays > 7', () => {
    // arr
    const dayFrom = 5;
    const maxDays = 12;
    const expectResult = [dayFrom, 6, 0, 1, 2, 3, 4]
    
    // act
    const result = getDaysOfWeek(dayFrom, maxDays);

    // assert
    expect(result).toStrictEqual(expectResult);
  });

  test('should return empty array when maxDays undefined', () => {
    // arr
    const dayFrom = 5;
    const expectResult = []
    
    // act
    const result = getDaysOfWeek(dayFrom);

    // assert
    expect(result).toStrictEqual(expectResult);
  });

  test('should return empty array when dayFrom negative', () => {
    // arr
    const dayFrom = -5;
    const maxDays = 12;
    const expectResult = []
    
    // act
    const result = getDaysOfWeek(dayFrom, maxDays);

    // assert
    expect(result).toStrictEqual(expectResult);
  });
});