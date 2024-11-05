const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-file");

  const responseData = await fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  return responseData;
};

export default uploadFile;
