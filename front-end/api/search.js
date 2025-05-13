import request from '../utils/request.js'
export function getSarch(searchText) {
	return request.post('/search', {
		searchText,
	})
}


export function SarchPosts(searchText) {
	return request.post('/searchPosts', {
		searchText,
	})
}

export function getSearchHot() {
	return request.get('/getSearchHot');
}