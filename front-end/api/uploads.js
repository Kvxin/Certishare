// 假设axios已经被导入和配置好了
import axios from '../utils/request.js';

/**
 * 上传图片列表到服务器。
 * @param {Array<string>} imgList - 图片列表的 blob URL 数组。
 */
export async function uploadImages(imgList) {
	const formData = new FormData();
	for (const blobUrl of imgList) {
		const response = await fetch(blobUrl);
		const blob = await response.blob();
		const filename = `image-${Date.now()}.jpg`;
		formData.append('files', blob, filename);
	}
	// 使用 fetch 发送请求
	// http://127.0.0.1:3011/uploads
	// https://share.cs.kvxin.top/uploads
	try {
		const response = await fetch('https://share.cs.kvxin.top/uploads', {
			method: 'POST',
			body: formData, // 传递 FormData
		});
		if (!response.ok) {
			throw new Error('Network response was not ok.');
		}
		// 处理响应数据	
		const result = await response.json();
		return result
	} catch (error) {
		console.error('Error:', error);
	}
}