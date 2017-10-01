
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	describe('objects', () => {
		test('evals shorthand notation', () => {
			const expression = `
				const hello = 1234
				const x = { hello }
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(scope[0].x.hello).toEqual(1234)
		})

		test('evals object spreads', () => {
			const expression = `
				const obj1 = { foo: 'bar', x: 42 }
				const clonedObj = { ...obj1 }
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(scope[0].obj1).toEqual(scope[0].clonedObj)
		})

		test('evals dot access', () => {
			const expression = 'const x = { hello: 1234 }'
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(scope[0].x.hello).toEqual(1234)
		})

		test('evals dot assignment', () => {
			const expression = `
				const x = { hello: 1234 }
				x.test = 'super cool'
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(scope[0].x.test).toEqual('super cool')
		})

		test('evals bracket access', () => {
			const expression = `
				const x = { hello: 1234 }
				const y = 'hello'
				x[y]
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(aval(ast.program.body[2], scope)).toEqual(1234)
		})

		test('evals bracket assignment', () => {
			const expression = `
				const x = { hello: 1234 }
				const y = 'test'
				x[y] = 'amazing'
			`
			const ast = parse(expression)
			const scope = [{}]
			expect(aval(ast.program.body[0], scope)).toEqual(undefined)
			expect(aval(ast.program.body[1], scope)).toEqual(undefined)
			expect(aval(ast.program.body[2], scope)).toEqual(undefined)
			expect(scope[0].x['test']).toEqual('amazing')
		})
	})
})
