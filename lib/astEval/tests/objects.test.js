import { expect } from 'chai'
import { aval } from '../aval'
import { parse } from '../parse'

describe('aval', () => {
	context('objects', () => {
		it('evals dot access', () => {
			const expression = 'const x = { hello: 1234 }'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
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
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(aval(ast.program.body[2], scope)).to.equal(1234)
		})
	})
})
