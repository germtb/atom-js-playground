import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('literals', () => {
		it('evals number literal', () => {
			const expression = '0'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(0)
		})

		it('evals a null literal', () => {
			const expression = 'null'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(null)
		})

		it('evals a undefined literal', () => {
			const expression = 'undefined'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(aval(node)).to.equal(undefined)
		})

		it('evals a string declaration', () => {
			const expression = 'const s = "Hello morning!"'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program, scope)).to.equal(undefined)
			expect(scope[0].s).to.equal('Hello morning!')
		})

		it('evals an array declaration', () => {
			const expression = '[0, 1, 2, 3]'
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			expect(aval(node1)).to.eql([0, 1, 2, 3])
		})

		it('evals an object declaration', () => {
			const expression = `
				const x = { y: "1234"}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.eql(undefined)
			expect(scope[0].x).to.eql({ y: '1234' })
		})

		it('evals an object with a variable as key', () => {
			const expression = `
				const y = 'hello'
				const z = { [y]: "1234" }
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.eql(undefined)
			expect(scope[0].z).to.eql({ hello: '1234' })
		})
	})
})
