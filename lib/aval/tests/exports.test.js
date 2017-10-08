
import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('array', () => {
		test('evals array access', () => {
			const expression = 'export const x = 1'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(scope[0].x).toEqual(1)
		})
	})
})
