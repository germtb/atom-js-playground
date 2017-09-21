import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('assignment operators', () => {
		it('evals an declaration', () => {
			const expression = 'const x = 1'
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(1)
		})

		it('evals an assignment', () => {
			const expression = `
				let x = 1
				x = 2
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(2)
		})

		it('evals an assign sum', () => {
			const expression = `
				let x = 1
				x += 1
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(astEval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(astEval(node2, scope)).to.equal(2)
		})

		it('evals an assign substraction', () => {
			const expression = `
				let x = 1
				x -= 1
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(astEval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(astEval(node2, scope)).to.equal(0)
		})

		it('evals an assign product', () => {
			const expression = `
				let x = 2
				x *= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(astEval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(astEval(node2, scope)).to.equal(6)
		})

		it('evals an assign division', () => {
			const expression = `
				let x = 6
				x /= 2
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(astEval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(astEval(node2, scope)).to.equal(3)
		})
	})
})
