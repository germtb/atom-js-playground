
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	describe('functions', () => {
		test('evals a function with a mock', () => {
			const expression = `
				// playground f(10)
				const f = x => {
					return 10 * x
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].mocks).toEqual({
				f: [
					{
						arguments: [10],
						result: 100
					}
				]
			})
		})

		test('evals a function with a mock with 2 vars', () => {
			const expression = `
				// playground f(10, 5)
				const f = (x, y) => {
					return 10 * y
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].mocks).toEqual({
				f: [
					{
						arguments: [10, 5],
						result: 50
					}
				]
			})
		})
	})
})
