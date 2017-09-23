import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('array', () => {
		it('evals array access', () => {
			const expression = 'export const x = 1'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(1)
		})
	})
})
