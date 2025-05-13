import request from '../utils/request.js'

export function singIn(data) {
	return request.post('/signin', {
		data
	})
}

export function getUserSignData(userId) {
	return request.post('/getUserSignInData', {
		userId
	})
}

export function getUserData(id) {
	return request.post('/getUser', {
		id
	})
}

export function getUserCardData(id) {
	return request.post('/getUserCardList', {
		id
	})
}

export function updateUserInformation(uid, updateInfo) {
	const dataToUpdate = {
		uid,
		updateInfo,
	};
	return request.patch('/updateUser', dataToUpdate);
}