import request from '/utils/request.js'


export function register(userData) {
	return request.post('/register', {
		userData
	})
}

export function sendCode(email) {
	return request.post('/sendVerification', {
		email,
	})
}