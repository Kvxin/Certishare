import request from '../utils/request.js'
export function getCarousel() {
	return request.get('/getAllCarousels')
}