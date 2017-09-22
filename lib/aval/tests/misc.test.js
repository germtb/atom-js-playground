import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	it('evals a Program', () => {
		const expression = ''
		const ast = parse(expression)
		expect(aval(ast.program)).to.equal(undefined)
	})
})
