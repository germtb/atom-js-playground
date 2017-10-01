import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('assignment operators', () => {
		it('evals a declaration', () => {
			const expression = 'const x = 1'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(1)
		})

		it('evals =', () => {
			const expression = `
				let x = 1
				x = 2
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(2)
		})

		it('evals +=', () => {
			const expression = `
				let x = 1
				x += 1
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(2)
		})

		it('evals -=', () => {
			const expression = `
				let x = 1
				x -= 1
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(0)
		})

		it('evals *=', () => {
			const expression = `
				let x = 2
				x *= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(6)
		})

		it('evals /=', () => {
			const expression = `
				let x = 6
				x /= 2
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(3)
		})

		it('evals **=', () => {
			const expression = `
				let x = 2
				x **= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(8)
		})

		it('evals <<=', () => {
			const expression = `
				let x = 10
				x <<= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(10 << 3)
		})

		it('evals >>=', () => {
			const expression = `
				let x = 10
				x >>= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(10 >> 3)
		})

		it('evals >>>=', () => {
			const expression = `
				let x = 10
				x >>>= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(10 >>> 3)
		})

		it('evals &=', () => {
			const expression = `
				let x = 10
				x &= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(10 & 3)
		})

		it('evals ^=', () => {
			const expression = `
				let x = 10
				x ^= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(10 ^ 3)
		})

		it('evals |=', () => {
			const expression = `
				let x = 10
				x |= 3
			`
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(10 | 3)
		})
	})
})
