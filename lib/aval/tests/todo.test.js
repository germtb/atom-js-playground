import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('imports', () => {
		// TODO
	})

	context('exports', () => {
		// TODO
	})

	context('classes', () => {
		// TODO
		// it('evals class', () => {
		// 	const expression = `
		// 		class TestClass {
		// 		}
		// 	`
		//
		// 	const ast = parse(expression)
		// 	const scope = [{}]
		// 	expect(aval(ast.program.body[0], scope)).to.equal(undefined)
		// 	expect(scope.TestClass).to.exist
		// 	expect(scope.TestClass.constructor).to.exist
		// })
		// it('evals class with constructor', () => {
		// 	const expression = `
		// 		class TestClass {
		// 			constructor(x) {
		// 				this.x = x
		// 			}
		// 		}
		//
		// 		const t = new TestClass(10)
		// 	`
		//
		// 	const ast = parse(expression)
		// 	const scope = [{}]
		// 	expect(aval(ast.program.body[0], scope)).to.equal(undefined)
		// 	expect(scope.TestClass).to.exist
		// 	expect(scope.TestClass.constructor).to.exist
		//
		// 	expect(aval(ast.program.body[1], scope)).to.equal(undefined)
		// 	expect(scope.t).to.equal({
		// 		x: 10
		// })
		// })
	})
})
