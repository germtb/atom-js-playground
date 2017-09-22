import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('array', () => {
		it('evals array access', () => {
			const expression = `
				const x = ['hello', 'my', 'torquat']
				x[2]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal('torquat')
			expect(scope[0].x.__type).to.equal('array')
		})

		it('evals array assignment', () => {
			const expression = `
				const x = ['hello', 'my', 'torquat']
				x[2] = 'SUPER TORQUAT'
				x[2]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(aval(ast.program.body[2], scope)).to.equal('SUPER TORQUAT')
		})
	})
})
