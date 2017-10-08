
import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('logical operators', () => {
		test('evals &&', () => {
			expect(aval(parse('true && false').program.body[0])).toEqual(
				true && false
			)
		})

		test('evals &', () => {
			expect(aval(parse('true & false').program.body[0])).toEqual(
				true & false
			)
		})

		test('evals ||', () => {
			expect(aval(parse('true || false').program.body[0])).toEqual(
				true || false
			)
		})

		test('evals |', () => {
			expect(aval(parse('true | false').program.body[0])).toEqual(
				true | false
			)
		})

		test('evals !', () => {
			expect(aval(parse('!false').program.body[0])).toEqual(true)
		})
	})
})
