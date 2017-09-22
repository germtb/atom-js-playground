// import { expect } from 'chai'
// import { aval } from '../index'
// import { parse } from '../parse'

describe('aval', () => {
	// context('classes', () => {
	// 	it('evals a class declaration', () => {
	// 		const expression = `
	// 			class SomeClass {}
	// 		`
	//
	// 		const ast = parse(expression)
	// 		const scope = [{}]
	// 		expect(aval(ast.program.body[0], scope)).to.equal(undefined)
	// 		expect(scope[0].SomeClass, scope).to.exist
	// 	})
	//
	// 	it('evals a class construction', () => {
	// 		const expression = `
	// 			class SomeClass {}
	// 			new SomeClass()
	// 		`
	//
	// 		const ast = parse(expression)
	// 		const scope = [{}]
	// 		expect(aval(ast.program.body[0], scope)).to.equal(undefined)
	// 		const instance = aval(ast.program.body[1], scope)
	// 		expect(instance).to.eql({})
	// 		expect(instance.__class).to.equal('SomeClass')
	// 	})
	//
	// 	it('evals a class with constructor', () => {
	// 		const expression = `
	// 			class SomeClass {
	// 				constructor(x) {
	// 					this.x = x
	// 				}
	// 			}
	// 			new SomeClass(10)
	// 		`
	//
	// 		const ast = parse(expression)
	// 		const scope = [{}]
	// 		expect(aval(ast.program.body[0], scope)).to.equal(undefined)
	// 		expect(aval(ast.program.body[1], scope)).to.eql({
	// 			x: 10
	// 		})
	// 	})
	// })
})
