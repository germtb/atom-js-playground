import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('string operators', () => {
		it('evals a string sum', () => {
			const expression = "'21' + 'hello'"
			const ast = parse(expression)
			expect(astEval(ast.program.body[0])).to.equal('21hello')
		})

		it('evals a string sum assignment', () => {
			const expression = `
				let x = '1'
				x += '1'
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(astEval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(astEval(node2, scope)).to.equal('11')
		})
	})
})
