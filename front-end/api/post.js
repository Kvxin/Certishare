import request from '../utils/request.js'
export function getPostList() {
	return request.get('/posts')
}

export function getPostInfo(id) {
	return request.post('/post-info', {
		id
	})
}