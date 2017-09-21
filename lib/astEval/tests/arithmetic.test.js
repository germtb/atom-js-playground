import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('arithmetic', () => {
		it('evals +', () => {
			const expression = '1 + 2'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(3)
		})

		it('evals -', () => {
			const expression = '1 - 2'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(-1)
		})

		it('evals *', () => {
			const expression = '2 * 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(6)
		})

		it('evals /', () => {
			const expression = '6 / 3'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(2)
		})

		it('evals %', () => {
			const expression = '6 % 5'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(1)
		})

		it('evals x++', () => {
			const expression = `
				let x = 6
				x++
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(6)
			expect(astEval(ast.program.body[2], scope)).to.equal(7)
		})

		it('evals ++x', () => {
			const expression = `
				let x = 6
				++x
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(7)
			expect(astEval(ast.program.body[2], scope)).to.equal(7)
		})

		it('evals x--', () => {
			const expression = `
				let x = 6
				x--
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(6)
			expect(astEval(ast.program.body[2], scope)).to.equal(5)
		})

		it('evals --x', () => {
			const expression = `
				let x = 6
				--x
				x
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(5)
			expect(astEval(ast.program.body[2], scope)).to.equal(5)
		})
	})
})
