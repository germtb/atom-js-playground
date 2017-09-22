import { expect } from 'chai'
import { aval } from '../aval'
import { parse } from '../parse'

describe('aval', () => {
	context('functions', () => {
		it('evals a function declaration', () => {
			const expression = `
			function f(x) {
				return 3 * x
			}
			f(2)
		`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(6)
		})

		it('evals an anonymous function', () => {
			const expression = `
				const f = function(x) {
					return 3 * x
				}
				f(2)
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(6)
		})

		it('evals a block-less arrow function an keeps it in scope for later calling', () => {
			const expression = `
			const arrowFunction = () => 3
			arrowFunction()
		`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(3)
		})

		it('evals a block arrow function an keeps it in scope for later calling', () => {
			const expression = `
			const arrowFunction = () => { return 3 }
			arrowFunction()
		`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(3)
		})

		it('evals a block arrow function with arguments an keeps it in scope for later calling', () => {
			const expression = `
				const arrowFunction = x => { return 3 * x }
				arrowFunction(2)
			`

			const ast = parse(expression)
			const node1 = ast.program.body[0]
			const scope = [{}]
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(6)
		})

		it('evals complex function', () => {
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
			expect(aval(node1, scope)).to.equal(undefined)
			const node2 = ast.program.body[1]
			expect(aval(node2, scope)).to.equal(6)
		})
	})
})
