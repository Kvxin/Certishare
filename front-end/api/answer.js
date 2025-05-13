import request from '/utils/request.js'
export function getQuestion(data, userId) {
	return request({
		url: '/getQuestion',
		method: 'GET',
		params: {
			data,
			userId
		}
	})
}
export function postAnswer(data) {
	return request({
		url: '/post-answer',
		method: 'POST',
		params: {
			data
		}
	})
}