const findmax = require('../src/findmax.js');

describe('testing findmax', () => {
    // TODO: a test that results in failure (do not compute maximum) it should fail
    test('a test that fails', () => {
        const input = [-3, 5]
        const expected_output = 5
        const actual_output = input
        expect(actual_output).toBe(expected_output)
    })
    // TODO: a test that results in error, it should throw an error that the test won't catch
    test('a test that throws error', () => {
        const input = null
        const expected_output = null
        const actual_output = findmax(input)
        expect(actual_output).toBe(expected_output)
    })
    // TODO: a test that results in pass
    test('a test that passes', () => {
        const input = [5, -3]
        const expected_output = 5
        const actual_output = findmax(input)
        expect(actual_output).toBe(expected_output)
    })
});