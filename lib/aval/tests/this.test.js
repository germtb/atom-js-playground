import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	describe('this', () => {
		test('evals to global in the global scope', () => {
			const expression = 'this'
			const ast = parse(expression)
			expect(aval(ast.program.body[0])).toEqual(global)
		})

		test('evals to undefined in a function scope', () => {
			const expression = `
				function f2() {
					return this;
				}
				f2()
			`
			const ast = parse(expression)
			expect(aval(ast.program.body[0])).toEqual(undefined)
			expect(aval(ast.program.body[1])).toEqual(undefined)
		})

		test('evals to a binded object in a function', () => {
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
			expect(aval(ast.program.body[0], scopes)).toEqual(undefined)
			expect(aval(ast.program.body[1], scopes)).toEqual(undefined)
			expect(aval(ast.program.body[2], scopes)).toEqual(undefined)
			expect(aval(ast.program.body[3], scopes)).toEqual({ x: 10 })
		})

		test('evals an arrow this to the parent this', () => {
			const expression = `
				const foo = () => this
				foo()
			`
			const ast = parse(expression)
			expect(aval(ast.program.body[0])).toEqual(undefined)
			expect(aval(ast.program.body[1])).toEqual(global)
		})

		test('evals a this in a property where its method was defined', () => {
			const expression = `
				const obj = {
					test: 'foo',
					something: function() {
						return this.test
					}
				}
				obj.something()
			`

			const ast = parse(expression)
			const scopes = [{}]
			expect(aval(ast.program.body[0], scopes)).toEqual(undefined)
			expect(aval(ast.program.body[1], scopes)).toEqual('foo')
		})

		// test('evals a this in an object method to the object in which it was defined', () => {
		// 	const expression = `
		// 		const obj = {
		// 			test: 'foo',
		// 			something() {
		// 				return this.test
		// 			}
		// 		}
		// 		obj.something()
		// 	`
		//
		// 	const ast = parse(expression)
		// 	const scopes = [{}]
		// 	expect(aval(ast.program.body[0], scopes)).toEqual(undefined)
		// 	expect(aval(ast.program.body[1], scopes)).toEqual('foo')
		// })
	})
})
