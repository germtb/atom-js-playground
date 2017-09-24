import { expect } from 'chai'
import { shallow } from 'enzyme'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('jsx', () => {
		it('evals jsx declaration', () => {
			const expression = '<div className="hello"/>'
			const ast = parse(expression)
			const node = ast.program.body[0]
			const element = aval(node)
			expect(element.type).to.equal('div')
			expect(element.props).to.eql({
				className: 'hello',
				children: []
			})
		})

		it('evals jsx declaration with text children', () => {
			const expression = "<div className='hello'>SOMETHING</ div>"

			const ast = parse(expression)
			const node = ast.program.body[0]
			const element = aval(node)
			expect(element.type).to.equal('div')
			expect(element.props).to.eql({
				className: 'hello',
				children: ['SOMETHING']
			})
		})

		it('evals jsx declaration with number children', () => {
			const expression = "<div className='hello'>{1234}</ div>"

			const ast = parse(expression)
			const node = ast.program.body[0]
			const element = aval(node)
			expect(element.type).to.equal('div')
			expect(element.props).to.eql({
				className: 'hello',
				children: [1234]
			})
		})
	})
})
