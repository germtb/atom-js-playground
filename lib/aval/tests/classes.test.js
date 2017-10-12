import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	it('can declare empty classes', () => {
		const expression = 'class SomeClass {}'
		const ast = parse(expression)
		const scope = [{}]
		expect(aval(ast.program, scope)).toEqual(undefined)
		expect(scope[0].SomeClass.__type).toEqual('class')
	})

	it('can construct an instance of an empty class', () => {
		const expression = `
			class SomeClass {}
			const someInstance = new SomeClass()
		`
		const ast = parse(expression)
		const scope = [{}]
		expect(aval(ast.program, scope)).toEqual(undefined)
		expect(scope[0].someInstance.__type).toEqual('instance')
		expect(scope[0].someInstance.__class).toEqual('SomeClass')
		expect(scope[0].someInstance.__proto).toEqual({})
	})

	it('can construct instances of a class with a constructor', () => {
		const expression = `
			class SomeClass {
				constructor() {
					this.x = 10
				}
			}
			const someInstance = new SomeClass()
		`
		const ast = parse(expression)
		const scope = [{}]
		expect(aval(ast.program, scope)).toEqual(undefined)
		expect(scope[0].someInstance.__type).toEqual('instance')
		expect(scope[0].someInstance.__class).toEqual('SomeClass')
		expect(scope[0].someInstance.__proto).toEqual({})
		expect(scope[0].someInstance.x).toEqual(10)
	})
})
