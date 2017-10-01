
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	describe('literals', () => {
		test('evals number literal', () => {
			const expression = '0'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(0)
		})

		test('evals a template literal', () => {
			const expression = '`hello ${10 * 10} and ${3 - 3}`'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual('hello 100 and 0')
		})

		test('evals a null literal', () => {
			const expression = 'null'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(null)
		})

		test('evals a undefined literal', () => {
			const expression = 'undefined'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(undefined)
		})

		test('evals a string declaration', () => {
			const expression = 'const s = "Hello morning!"'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program, scope)).toEqual(undefined)
			expect(scope[0].s).toEqual('Hello morning!')
		})

		test('evals an array declaration', () => {
			const expression = '[0, 1, 2, 3]'
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			expect(aval(node1)).toEqual([0, 1, 2, 3])
		})

		test('evals an object declaration', () => {
			const expression = `
				const x = { y: "1234"}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(scope[0].x).toEqual({ y: '1234' })
		})

		test('evals an object with a variable as key', () => {
			const expression = `
				const y = 'hello'
				const z = { [y]: "1234" }
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(scope[0].z).toEqual({ hello: '1234' })
		})

		test('evals a regex', () => {
			const expression = 'const y = /.*/'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(scope[0].y.test('hello')).toEqual(true)
		})
	})
})
