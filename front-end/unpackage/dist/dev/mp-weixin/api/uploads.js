"use strict";
require("../utils/request.js");
async function uploadImages(imgList) {
  const formData = new FormData();
  for (const blobUrl of imgList) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const filename = `image-${Date.now()}.jpg`;
    formData.append("files", blob, filename);
  }
  try {
    const response = await fetch("https://share.cs.kvxin.top/uploads", {
      method: "POST",
      body: formData
      // 传递 FormData
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
exports.uploadImages = uploadImages;
