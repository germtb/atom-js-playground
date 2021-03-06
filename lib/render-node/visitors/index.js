'use babel'

import literalsFactory from './literals'
import declarationsFactory from './declarations'
import syntaxFactory from './syntax'
import functionsFactory from './functions'
import objectsFactory from './objects'
import coreFactory from './core'
import classesFactory from './classes'
import binaryExpressionsFactory from './binaryExpressions'
import assignmentsFactory from './assignments'
import jsxFactory from './jsx'
import thisFactory from './this'

const visitorsFactory = dependencies => ({
	...literalsFactory(dependencies),
	...declarationsFactory(dependencies),
	...syntaxFactory(dependencies),
	...functionsFactory(dependencies),
	...objectsFactory(dependencies),
	...coreFactory(dependencies),
	...classesFactory(dependencies),
	...binaryExpressionsFactory(dependencies),
	...assignmentsFactory(dependencies),
	...jsxFactory(dependencies),
	...thisFactory(dependencies)
})

export default visitorsFactory
