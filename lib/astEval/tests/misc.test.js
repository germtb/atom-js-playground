import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	it('evals a Program', () => {
		const expression = ''
		const ast = parse(expression)
		expect(astEval(ast.program)).to.equal(undefined)
	})
})
