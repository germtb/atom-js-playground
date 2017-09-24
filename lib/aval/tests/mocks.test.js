import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('functions', () => {
		it('evals a function with a mock', () => {
			const expression = `
				// playground f(10)
				const f = x => {
					return 10 * x
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).to.equal(undefined)
			expect(scope[0].mocks).to.eql({
				f: [
					{
						arguments: [10],
						result: 100
					}
				]
			})
		})

		it('evals a function with a mock with 2 vars', () => {
			const expression = `
				// playground f(10, 5)
				const f = (x, y) => {
					return 10 * y
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).to.equal(undefined)
			expect(scope[0].mocks).to.eql({
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
