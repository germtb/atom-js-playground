
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	describe('array', () => {
		test('evals array access', () => {
			const expression = `
				const x = ['hello', 'my', 'torquat']
				x[2]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual('torquat')
			expect(scope[0].x.__type).toEqual('array')
		})

		test('evals array assignment', () => {
			const expression = `
				const x = ['hello', 'my', 'torquat']
				x[2] = 'SUPER TORQUAT'
				x[2]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(aval(ast.program.body[2], scope)).toEqual('SUPER TORQUAT')
		})

		test('evals an array method call', () => {
			const expression = '[0, 1, 2].map(() => 10)'
			const ast = parse(expression)
			expect(aval(ast.program.body[0])).toEqual([10, 10, 10])
		})
	})
})
