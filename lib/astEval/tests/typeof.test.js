import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	it('evals typeof', () => {
		expect(astEval(parse('typeof [0, 1, 2]').program.body[0])).to.equal(
			'object'
		)
	})
})
