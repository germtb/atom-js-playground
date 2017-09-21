import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('literals', () => {
		it('evals number literal', () => {
			const expression = '0'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(0)
		})

		it('evals a null literal', () => {
			const expression = 'null'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(null)
		})

		it('evals a undefined literal', () => {
			const expression = 'undefined'
			const ast = parse(expression)
			const node = ast.program.body[0]
			expect(astEval(node)).to.equal(undefined)
		})

		it('evals a string declaration', () => {
			const expression = 'const s = "Hello morning!"'
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program, scope)).to.equal(undefined)
			expect(scope[0].s).to.equal('Hello morning!')
		})

		it('evals an array declaration', () => {
			const expression = '[0, 1, 2, 3]'
			const ast = parse(expression)
			const node1 = ast.program.body[0]
			expect(astEval(node1)).to.eql([0, 1, 2, 3])
		})

		it('evals an object declaration', () => {
			const expression = `
				const x = { y: "1234"}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.eql(undefined)
			expect(scope[0].x).to.eql({ y: '1234' })
		})

		it('evals an object with a variable as key', () => {
			const expression = `
				const y = 'hello'
				const z = { [y]: "1234" }
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.eql(undefined)
			expect(scope[0].z).to.eql({ hello: '1234' })
		})
	})
})
