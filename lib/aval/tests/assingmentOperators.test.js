import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('assignment operators', () => {
		test('evals a declaration', () => {
			const expression = 'const x = 1'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(scope[0].x).toEqual(1)
		})

		test('evals a multiple declaration', () => {
			const expression = `
				var variable1 = "Hello World!",
						variable2 = "Testing...",
						variable3 = 42;
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(scope[0].variable1).toEqual('Hello World!')
			expect(scope[0].variable2).toEqual('Testing...')
			expect(scope[0].variable3).toEqual(42)
		})

		test('evals =', () => {
			const expression = `
				let x = 1
				x = 2
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(scope[0].x).toEqual(2)
		})

		test('evals +=', () => {
			const expression = `
				let x = 1
				x += 1
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(2)
		})

		test('evals -=', () => {
			const expression = `
				let x = 1
				x -= 1
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(0)
		})

		test('evals *=', () => {
			const expression = `
				let x = 2
				x *= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(6)
		})

		test('evals /=', () => {
			const expression = `
				let x = 6
				x /= 2
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(3)
		})

		test('evals **=', () => {
			const expression = `
				let x = 2
				x **= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(8)
		})

		test('evals <<=', () => {
			const expression = `
				let x = 10
				x <<= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(10 << 3)
		})

		test('evals >>=', () => {
			const expression = `
				let x = 10
				x >>= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(10 >> 3)
		})

		test('evals >>>=', () => {
			const expression = `
				let x = 10
				x >>>= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(10 >>> 3)
		})

		test('evals &=', () => {
			const expression = `
				let x = 10
				x &= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(10 & 3)
		})

		test('evals ^=', () => {
			const expression = `
				let x = 10
				x ^= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(10 ^ 3)
		})

		test('evals |=', () => {
			const expression = `
				let x = 10
				x |= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).toEqual(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).toEqual(10 | 3)
		})
	})
})
