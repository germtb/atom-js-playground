
import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('comparisson operators', () => {
		test('evals ==', () => {
			expect(aval(parse('0 == 1').program.body[0])).toEqual(0 == 1)
			expect(aval(parse('0 == 0').program.body[0])).toEqual(0 == 0)
		})

		test('evals ===', () => {
			expect(aval(parse('0 === 1').program.body[0])).toEqual(0 === 1)
			expect(aval(parse('0 === 0').program.body[0])).toEqual(0 === 0)
		})

		test('evals ==', () => {
			expect(aval(parse('0 != 1').program.body[0])).toEqual(0 != 1)
			expect(aval(parse('0 != 0').program.body[0])).toEqual(0 != 0)
		})

		test('evals !=', () => {
			expect(aval(parse('0 != 1').program.body[0])).toEqual(0 != 1)
			expect(aval(parse('0 != 0').program.body[0])).toEqual(0 != 0)
		})

		test('evals !==', () => {
			expect(aval(parse('0 !== 1').program.body[0])).toEqual(0 !== 1)
			expect(aval(parse('0 !== 0').program.body[0])).toEqual(0 !== 0)
		})

		test('evals >', () => {
			expect(aval(parse('0 > 1').program.body[0])).toEqual(0 > 1)
			expect(aval(parse('0 > 0').program.body[0])).toEqual(0 > 0)
		})

		test('evals <', () => {
			expect(aval(parse('0 < 1').program.body[0])).toEqual(0 < 1)
			expect(aval(parse('0 < 0').program.body[0])).toEqual(0 < 0)
		})

		test('evals >=', () => {
			expect(aval(parse('0 >= 1').program.body[0])).toEqual(0 >= 1)
			expect(aval(parse('0 >= 0').program.body[0])).toEqual(0 >= 0)
		})

		test('evals <=', () => {
			expect(aval(parse('0 <= 1').program.body[0])).toEqual(0 <= 1)
			expect(aval(parse('0 <= 0').program.body[0])).toEqual(0 <= 0)
		})
	})
})
