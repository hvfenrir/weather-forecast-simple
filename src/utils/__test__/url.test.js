import { buildUrl } from 'utils/url';

describe('Build URL with params', () => {
  test('should return combined url with params', () => {
    // arr
    const url = 'http://url.com/:slug';
    const params = { slug: 'testId' };
    const expectResult = 'http://url.com/testId';
    
    // act
    const result = buildUrl(url, params);

    // assert
    expect(result).toStrictEqual(expectResult);
  })

  test('should return combined url with params when have multiple param', () => {
    // arr
    const url = 'http://url.com/:slug/:id/:urlId';
    const params = { slug: 'testId', id: 1, urlId: 'xyz' };
    const expectResult = 'http://url.com/testId/1/xyz';
    
    // act
    const result = buildUrl(url, params);

    // assert
    expect(result).toStrictEqual(expectResult);
  })

  test('should return url when params undefined or empty', () => {
    // arr
    const url = 'http://url.com/:slug/:id/:urlId';
    const expectResult = url;
    
    // act
    const result = buildUrl(url);

    // assert
    expect(result).toStrictEqual(expectResult);
  })
});