import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('objects', () => {
		it('evals dot access', () => {
			const expression = 'const x = { hello: 1234 }'
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(scope[0].x.hello).to.equal(1234)
		})

		it('evals bracket access', () => {
			const expression = `
				const x = { hello: 1234 }
				const y = 'hello'
				x[y]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[2], scope)).to.equal(1234)
		})
	})
})
