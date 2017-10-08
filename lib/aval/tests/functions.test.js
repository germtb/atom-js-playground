import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('functions', () => {
		test('evals a function declaration', () => {
			const expression = `
			function f(x) {
				return 3 * x
			}
			f(2)
		`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(6)
		})

		test('evals an anonymous function', () => {
			const expression = `
				const f = function(x) {
					return 3 * x
				}
				f(2)
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(6)
		})

		test('evals a recursive function', () => {
			const expression = `
				const f = x => x > 1 ? f(x - 1) : 1
				f(10)
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(1)
		})

		test('evals a complex recursive function', () => {
			const expression = `
				const fib = x => {
					if (x <= 2) {
						return 1
					} else {
						return fib(x - 1) + fib(x - 2)
					}
				}
				fib(10)
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(55)
		})

		test('evals a block-less arrow function an keeps it in scope for later calling', () => {
			const expression = `
					const arrowFunction = () => 3
					arrowFunction()
			`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(3)
		})

		test('evals a block arrow function an keeps it in scope for later calling', () => {
			const expression = `
					const arrowFunction = () => { return 3 }
					arrowFunction()
			`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(3)
		})

		test('evals a block arrow function with arguments an keeps it in scope for later calling', () => {
			const expression = `
					const arrowFunction = x => { return 3 * x }
					arrowFunction(2)
			`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(6)
		})

		test('evals a rest element', () => {
			const expression = `
				const arrowFunction = (...xs) => { return xs.length }
				arrowFunction(2, 1, 0)
			`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(3)
		})

		test('evals complex function', () => {
			const expression = `
				const arrowFunction = x => {
					const y = 2
					y += 1
					return y * x
				}
				arrowFunction(2)
			`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(6)
		})
	})
})
