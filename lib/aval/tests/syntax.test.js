import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
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
			expect(aval(ast.program.body[0], scopes)).to.equal(undefined)
			expect(aval(ast.program.body[1], scopes)).to.equal(undefined)
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
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
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
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
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
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal('NO!')
		})

		it('evals a ternary', () => {
			expect(aval(parse('1 ? "hello" : "bye"').program.body[0])).to.equal(
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
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(5)
		})

		it('evals a while', () => {
			const expression = `
				let x = 0
				while (x < 5) {
					x++
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(5)
		})

		it('evals a for of', () => {
			const expression = `
				const iterable = [0, 1, 2, 3, 4, 5]
				let x
				for (const y of iterable) {
					x = y
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(aval(ast.program.body[2], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal(5)
		})

		it('evals a for in', () => {
			const expression = `
				const iterable = [0, 1, 2, 3, 4, 5]
				iterable['foo'] = 'hello'
				let x
				for (const y in iterable) {
					x = y
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(aval(ast.program.body[2], scope)).to.equal(undefined)
			expect(aval(ast.program.body[3], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal('foo')
		})

		it('evals a continue', () => {
			const expression = `
				const iterable = [0, 1, 2, 3, 4, 5]
				let x = 'unsolid'
				for (const y of iterable) {
					continue
					x = y
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).to.equal(undefined)
			expect(aval(ast.program.body[1], scope)).to.equal(undefined)
			expect(aval(ast.program.body[2], scope)).to.equal(undefined)
			expect(scope[0].x).to.equal('unsolid')
		})
	})
})
