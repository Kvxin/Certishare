import request from '../utils/request.js'

export function getCardList() {
	return request.get('/api/getCardList')
}
export function getCardInfo(id) {
	return request.get(`/api/getCardInfo?id=${id}`)
}
export function setLikeCard(cardId, userId) {
	return request.post('/api/setLikeCard', {
		cardId,
		userId
	})
}
export function createCard(data) {
	return request.post('/api/createCard', {
		data
	})
}

export function getTypeList(key) {
	return request.post('/api/getTypeList', {
		key
	})
}

export function addToWatchedHistory(userId, cardId) {
	return request.post('/api/addToWatchedHistory', {
		userId,
		cardId
	})
}