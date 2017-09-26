'use babel'

export const add = (name, value, scopes) => {
	scopes[scopes.length - 1][name] = value
}

export const get = (name, scopes) => {
	for (let i = scopes.length - 1; i >= 0; i--) {
		if (name in scopes[i]) {
			return scopes[i][name]
		}
	}
}
