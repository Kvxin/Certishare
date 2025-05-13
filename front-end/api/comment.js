import request from '../utils/request.js'

export function comSend(data) {
	return request.post('/sendcomment', {
		data
	})
}

export function getComment(cardId) {
	return request.post('/getcomment', {
		cardId
	})
}