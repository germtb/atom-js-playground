import { expect } from 'chai'
import { aval } from '../aval'
import { parse } from '../parse'

describe('aval', () => {
	it('evals typeof', () => {
		expect(aval(parse('typeof [0, 1, 2]').program.body[0])).to.equal(
			'object'
		)
	})
})
