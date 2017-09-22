import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('string operators', () => {
		it('evals a string sum', () => {
			const expression = "'21' + 'hello'"
			const ast = parse(expression)
			expect(aval(ast.program.body[0])).to.equal('21hello')
		})

		it('evals a string sum assignment', () => {
			const expression = `
				let x = '1'
				x += '1'
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal('11')
		})
	})
})
