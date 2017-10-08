import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('arithmetic', () => {
		test('evals +', () => {
			const expression = '1 + 2'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(3)
		})

		test('evals -', () => {
			const expression = '1 - 2'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(-1)
		})

		test('evals *', () => {
			const expression = '2 * 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(6)
		})

		test('evals /', () => {
			const expression = '6 / 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(2)
		})

		test('evals %', () => {
			const expression = '6 % 5'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(1)
		})

		test('evals **', () => {
			const expression = '3 ** 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(27)
		})

		test('evals &', () => {
			expect(aval(parse('3 & 3').program.body[0])).toEqual(3 & 3)
		})

		test('evals |', () => {
			expect(aval(parse('3 | 3').program.body[0])).toEqual(3 | 3)
		})

		test('evals ^', () => {
			expect(aval(parse('3 ^ 3').program.body[0])).toEqual(3 ^ 3)
		})

		test('evals <<', () => {
			expect(aval(parse('3 << 3').program.body[0])).toEqual(3 << 3)
		})

		test('evals >>', () => {
			expect(aval(parse('3 >> 3').program.body[0])).toEqual(3 >> 3)
		})

		test('evals >>>', () => {
			expect(aval(parse('3 >>> 3').program.body[0])).toEqual(3 >>> 3)
		})

		test('evals ~', () => {
			expect(aval(parse('~3').program.body[0])).toEqual(~3)
		})

		test('evals ()', () => {
			expect(aval(parse('(1 + 2) * 3').program.body[0])).toEqual(9)
			expect(aval(parse('1 + (2 * 3)').program.body[0])).toEqual(7)
		})

		test('evals +x', () => {
			const expression = '+"10"'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(10)
		})

		test('evals -x', () => {
			const expression = '-"10"'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).toEqual(-10)
		})

		test('evals x++', () => {
			const expression = `
				let x = 6
				x++
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(6)
			expect(aval(ast.program.body[2], scope)).toEqual(7)
		})

		test('evals ++x', () => {
			const expression = `
				let x = 6
				++x
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(7)
			expect(aval(ast.program.body[2], scope)).toEqual(7)
		})

		test('evals x--', () => {
			const expression = `
				let x = 6
				x--
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(6)
			expect(aval(ast.program.body[2], scope)).toEqual(5)
		})

		test('evals --x', () => {
			const expression = `
				let x = 6
				--x
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(5)
			expect(aval(ast.program.body[2], scope)).toEqual(5)
		})
	})
})
