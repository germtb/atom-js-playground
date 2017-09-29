import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('this', () => {
		it('evals to global in the global scope', () => {
			const expression = 'this === global'
			const ast = parse(expression)
			expect(aval(ast.program.body[0])).to.equal(true)
		})

		it('evals to undefined in a function scope', () => {
			const expression = `
				function f2() {
					return this;
				}
				f2()
			`
			const ast = parse(expression)
			expect(aval(ast.program.body[0])).to.equal(undefined)
			expect(aval(ast.program.body[1])).to.equal(undefined)
		})

		it('evals to a binded object in a function', () => {
			const expression = `
				function f2() {
					return this;
				}
				const obj = { x: 10 }
				const bindedf2 = f2.bind(obj)
				bindedf2()
			`
			const ast = parse(expression)
			const scopes = [{}]
			expect(aval(ast.program.body[0], scopes)).to.equal(undefined)
			expect(aval(ast.program.body[1], scopes)).to.equal(undefined)
			expect(aval(ast.program.body[2], scopes)).to.equal(undefined)
			expect(aval(ast.program.body[3], scopes)).to.eql({ x: 10 })
		})
	})
})
