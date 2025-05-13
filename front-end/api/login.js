import request from '/utils/request.js'

export function login(email, password) {
	return request.post('/login', {
		email,
		password,
	})
}