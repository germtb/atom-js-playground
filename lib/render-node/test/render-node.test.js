import { renderNode } from '..'
import { aval } from '../../aval'
import { parse } from '../../parse'
import { shallow } from 'enzyme'

const nodeFor = str => {
	const scopes = [{}]
	const ast = parse(str)
	aval(ast, scopes)
	return renderNode(ast, scopes)
}

describe('node-views', () => {
	it('renders a numeric VariableDeclaration', () => {
		const output = shallow(nodeFor('const x = 0'))
		expect(output.render().text()).toEqual('x: 0')
	})

	it('renders an arrow VariableDeclaration', () => {
		const output = shallow(nodeFor('const x = () => 0'))
		expect(output.render().text()).toEqual('x: arrow')
	})

	it('renders a function VariableDeclaration', () => {
		const output = shallow(nodeFor('const x = function() {}'))
		expect(output.render().text()).toEqual('x: function')
	})

	it('renders an Expression', () => {
		const output = shallow(nodeFor('0'))
		expect(output.text()).toEqual('0')
	})

	it('renders a named export', () => {
		const output = shallow(nodeFor('export const x = 0'))
		expect(output.text()).toEqual('export x: 0')
	})

	it('renders a default export', () => {
		const output = shallow(nodeFor('export default 0'))
		expect(output.text()).toEqual('export default: 0')
	})
})
