import axios from "axios";

export const getImgUrl = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`,
    formData
  );
  const url = data?.data?.display_url;

  return url;
};

export const logOut = async() => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/logout/${localStorage.getItem(
      "userEmail"
    )}`
  );

  return result;
};
