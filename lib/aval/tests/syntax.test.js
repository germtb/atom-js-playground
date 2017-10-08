import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('syntax thingies', () => {
		test('evals if', () => {
			const expression = `
				let x
				if (1 > 0) {
					x = 'hello!'
				}
			`
			const ast = parse(expression)
			const scopes = [{}]
			expect(aval(ast, scopes)).toEqual(undefined)
			expect(scopes[0].x).toEqual('hello!')
		})

		test('evals else', () => {
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
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual('bye!')
		})

		test('evals positive else if', () => {
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
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual('WON WON WON')
		})

		test('evals negative else if', () => {
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
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual('NO!')
		})

		test('evals a ternary', () => {
			expect(aval(parse('1 ? "hello" : "bye"').program.body[0])).toEqual(
				'hello'
			)
		})

		test('evals a for', () => {
			const expression = `
				let x = 0
				for (let i = 0; i < 5; i++) {
					x++
				}
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual(5)
		})

		test('evals a while', () => {
			const expression = `
				let x = 0
				while (x < 5) {
					x++
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual(5)
		})

		test('evals a for of', () => {
			const expression = `
				const iterable = [0, 1, 2, 3, 4, 5]
				let x
				for (const y of iterable) {
					x = y
				}
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual(5)
		})

		test('evals a for in', () => {
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
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual('foo')
		})

		test('evals a do while', () => {
			const expression = `
				let x = 0
				do {
					x++
				} while (x < 3)
			`

			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual(3)
		})

		test('evals a continue', () => {
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
			expect(aval(ast, scope)).toEqual(undefined)
			expect(scope[0].x).toEqual('unsolid')
		})
	})
})
