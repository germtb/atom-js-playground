
import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	test('evals a Program', () => {
		const expression = ''
		const ast = parse(expression)
		expect(aval(ast.program)).toEqual(undefined)
	})
})
