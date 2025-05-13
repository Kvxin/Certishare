import request from '../utils/request.js'

export function getNavData() {
	return request.get('/getNav');
}