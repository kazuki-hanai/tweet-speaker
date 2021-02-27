import { isJapanese } from './index';

test('isJapanese', () => {
    expect(isJapanese('hello world!')).toBeFalsy();
    expect(isJapanese('hello world❗')).toBeFalsy();
    expect(isJapanese('こんにちは')).toBeTruthy();
    expect(isJapanese('ハローワールド！')).toBeTruthy();
    expect(isJapanese('ハロー world')).toBeTruthy();
    expect(isJapanese('朝世界')).toBeTruthy();
});