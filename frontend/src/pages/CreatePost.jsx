import React, { useState } from "react";
import app from "../firebase.js";
import { ThreeDots } from "react-loader-spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [imgUplaoding, setImgUploading] = useState(false);
  const [waiting, setWaiting] = useState(null);
  const [imgUplaodingError, setImgUploadingError] = useState(null);
  const [error, setError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageHandler = async (e) => {
    e.preventDefault();
    setImgUploading(true);
    setError(null);
    setImgUploadingError(null);
    setWaiting("Image is uploading please wait");
    if (!image) {
      setImgUploading(false);
      setImgUploadingError("No image selected");
      setWaiting(null);
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setImgUploading(false);
        setImgUploadingError("format not supported. Upload failed");
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setWaiting(null);
          setImgUploading(false);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.title || !formData.content) {
      setError("Title and description is required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/post/createpost`,
        {
          formData,
          author: currentUser.username,
          userId: currentUser._id,
        }
      );
      if (response.status === 200) {
        navigate(`/`);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 409) {
          setError(
            "Post already exist with this title please choose a different title"
          );
          return;
        } else if (error.response.status == 400) {
          setError("Inappropriate content detected.Can not post this");
          return;
        } else if (error.response.status == 401) {
          setError("Title contains too many offensive words");
          return;
        } else if (error.response.status == 402) {
          setError("post content contains too many offensive words");
        } else {
          setError("Something went wrong");
          return;
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen  pt-20 pb-20 flex justify-center  overflow-x-hidden">
      <div className="max-w-[700px] px-2  mt-2 mb-10  items-center w-full flex  gap-10 flex-col">
        <h1 className="text-2xl dark:text-gray-300 text-textColor font-semibold">
          Create Post
        </h1>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-3 ">
          <input
            onChange={changeHandler}
            type="type"
            id="title"
            className="rounded-md w-full  py-2 px-2 dark:bg-cardBg-dark bg-gray-200 border focus:outline-none focus:border-indigo-900   border-indigo-600   dark:text-gray-300 text-textColor  "
            placeholder="Title"
          />
          <div className="flex md:flex-row flex-col justify-between gap-2">
            <input
              onChange={fileChangeHandler}
              type="file"
              accept="image/*"
              className="rounded-md py-2 px-2  grow   border dark:bg-cardBg-dark bg-gray-200 border-indigo-600 focus:outline-none focus:border-indigo-900  dark:text-gray-300 text-textColor  "
            />
            <button
              onClick={uploadImageHandler}
              className={`bg-indigo-700 rounded-md hover:scale-95 transition-all px-2 py-2 text-sm ${
                waiting && "pointer-events-none "
              } text-white`}
            >
              {imgUplaoding ? (
                <div className="flex justify-center items-center">
                  <ThreeDots
                    height="40"
                    width="60"
                    wrapperClass
                    color="white"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
          {waiting && <p className="text-green-600 text-sm">{waiting}</p>}
          {imgUplaodingError && (
            <p className="text-red-500 text-sm">{imgUplaodingError}</p>
          )}
          {formData?.image && (
            <img
              src={formData.image}
              className="w-full h-[300px]  border-2 border-indigo-700 self-center rounded-md"
            ></img>
          )}

          <textarea
            onChange={changeHandler}
            id="content"
            className="rounded-md w-full border-indigo-600 border focus:outline-none focus:border-indigo-900   dark:bg-cardBg-dark bg-gray-200 dark:text-gray-300 text-textColor py-2 px-2   "
            rows={10}
            placeholder="Write your post..."
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            className={`bg-indigo-700 py-2 px-2  hover:bg-indigo-800  transition-all ${
              imgUplaoding && " pointer-events-none cursor-not-allowed"
            }  text-white font-medium rounded-md`}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ThreeDots
                  height="25"
                  width="40"
                  wrapperClass
                  color="white"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              "Publish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
