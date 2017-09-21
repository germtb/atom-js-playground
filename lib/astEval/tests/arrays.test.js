import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('array', () => {
		it('evals array access', () => {
			const expression = `
				const x = ['hello', 'my', 'torquat']
				x[2]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal('torquat')
		})

		it('evals array assignment', () => {
			const expression = `
				const x = ['hello', 'my', 'torquat']
				x[2] = 'SUPER TORQUAT'
				x[2]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[2], scope)).to.equal('SUPER TORQUAT')
		})
	})
})
