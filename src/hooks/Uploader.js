import { useState } from "react";
import { message } from "antd";
import { atom, useAtom } from "jotai";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  //console.log(file.type)
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/svg+xml" || file.type === "image/gif" ;
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG/SVG/GIF file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    message.error("Image must smaller than 20MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const imageUrlAtom = atom(null);

const useUploader = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useAtom(imageUrlAtom);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      setImageUrl(null);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const customRequest = ({ onSuccess }) => {
    setLoading(true);
    setTimeout(onSuccess, 1000);
  };

  return { loading, imageUrl, handleChange, customRequest, beforeUpload };
};

export default useUploader;
