export const uploadPhotoToCloudinary = (e) => async () => {
  var response = [];

  for (let a = 0; a < e.target.files.length; a++) {
    const imageData = new FormData();
    imageData.append("file", e.target.files[a]);
    imageData.append("upload_preset", "skaneetk");

    await fetch("https://api.cloudinary.com/v1_1/dhyz4afz7/image/upload", {
      method: "POST",
      body: imageData,
    })
      .then((response) => response.json())
      .then((data) => response.push(data.secure_url));
  }

  return response;
};
