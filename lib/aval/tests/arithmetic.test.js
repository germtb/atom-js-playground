import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('arithmetic', () => {
		it('evals +', () => {
			const expression = '1 + 2'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(3)
		})

		it('evals -', () => {
			const expression = '1 - 2'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(-1)
		})

		it('evals *', () => {
			const expression = '2 * 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(6)
		})

		it('evals /', () => {
			const expression = '6 / 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(2)
		})

		it('evals %', () => {
			const expression = '6 % 5'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(1)
		})

		it('evals **', () => {
			const expression = '3 ** 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(27)
		})

		it('evals &', () => {
			expect(aval(parse('3 & 3').program.body[0])).to.equal(3 & 3)
		})

		it('evals |', () => {
			expect(aval(parse('3 | 3').program.body[0])).to.equal(3 | 3)
		})

		it('evals ^', () => {
			expect(aval(parse('3 ^ 3').program.body[0])).to.equal(3 ^ 3)
		})

		it('evals <<', () => {
			expect(aval(parse('3 << 3').program.body[0])).to.equal(3 << 3)
		})

		it('evals >>', () => {
			expect(aval(parse('3 >> 3').program.body[0])).to.equal(3 >> 3)
		})

		it('evals >>>', () => {
			expect(aval(parse('3 >>> 3').program.body[0])).to.equal(3 >>> 3)
		})

		it('evals ~', () => {
			expect(aval(parse('~3').program.body[0])).to.equal(~3)
		})

		it('evals ()', () => {
			expect(aval(parse('(1 + 2) * 3').program.body[0])).to.equal(9)
			expect(aval(parse('1 + (2 * 3)').program.body[0])).to.equal(7)
		})

		it('evals +x', () => {
			const expression = '+"10"'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(10)
		})

		it('evals -x', () => {
			const expression = '-"10"'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(-10)
		})

		it('evals x++', () => {
			const expression = `
				let x = 6
				x++
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(6)
			expect(aval(ast.program.body[2], scope)).to.equal(7)
		})

		it('evals ++x', () => {
			const expression = `
				let x = 6
				++x
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(7)
			expect(aval(ast.program.body[2], scope)).to.equal(7)
		})

		it('evals x--', () => {
			const expression = `
				let x = 6
				x--
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(6)
			expect(aval(ast.program.body[2], scope)).to.equal(5)
		})

		it('evals --x', () => {
			const expression = `
				let x = 6
				--x
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(5)
			expect(aval(ast.program.body[2], scope)).to.equal(5)
		})
	})
})
