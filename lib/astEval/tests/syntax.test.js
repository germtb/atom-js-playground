import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('syntax thingies', () => {
		it('evals if', () => {
			const expression = `
				let x
				if (1 > 0) {
					x = 'hello!'
				}
			`
			const ast = parse(expression)
			const scopes = [{}]
			expect(astEval(ast.program.body[0], scopes)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scopes)).to.equal(undefined)
			expect(scopes[0].x).to.equal('hello!')
		})

		it('evals else', () => {
			const expression = `
				let x
				if (0 > 1) {
					x = 'hello!'
				} else {
					x = 'bye!'
				}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal('bye!')
		})

		it('evals positive else if', () => {
			const expression = `
				let x
				if (0 > 1) {
					x = 'hello!'
				} else if(1 < 2) {
					x = 'WON WON WON'
				} else {
					x = 'NO!'
				}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal('WON WON WON')
		})

		it('evals negative else if', () => {
			const expression = `
				let x
				if (0 > 1) {
					x = 'hello!'
				} else if(1 > 2) {
					x = 'WON WON WON'
				} else {
					x = 'NO!'
				}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal('NO!')
		})

		it('evals a ternary', () => {
			expect(astEval(parse('1 ? "hello" : "bye"').program.body[0])).to.equal(
				'hello'
			)
		})

		it('evals a for', () => {
			const expression = `
				let x = 0
				for (let i = 0; i < 5; i++) {
					x++
				}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(astEval(ast.program.body[0], scope)).to.equal(undefined)
			expect(astEval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(5)
		})
	})
})
