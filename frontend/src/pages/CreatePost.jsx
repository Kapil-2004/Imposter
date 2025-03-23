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
  const [imgUploading, setImgUploading] = useState(false);
  const [waiting, setWaiting] = useState(null);
  const [imgUploadingError, setImgUploadingError] = useState(null);
  const [error, setError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setImgUploading(true);
    setError(null);
    setImgUploadingError(null);
    setWaiting("Image is uploading, please wait...");

    if (!image) {
      setImgUploading(false);
      setImgUploadingError("No image selected.");
      setWaiting(null);
      return;
    }

    const storage = getStorage(app);
    const fileName = `${Date.now()}_${image.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      null,
      () => {
        setImgUploading(false);
        setImgUploadingError("Format not supported. Upload failed.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setWaiting(null);
        setImgUploading(false);
        setFormData({ ...formData, image: downloadURL });
      }
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.content) {
      setError("Title and content are required.");
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
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        switch (error.response.status) {
          case 409:
            setError("A post with this title already exists. Choose a different title.");
            break;
          case 400:
            setError("Inappropriate content detected. Cannot post this.");
            break;
          case 401:
            setError("Title contains too many offensive words.");
            break;
          case 402:
            setError("Post content contains too many offensive words.");
            break;
          default:
            setError("Something went wrong.");
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen pt-20 pb-20 flex justify-center">
      <div className="max-w-[700px] px-2 mt-2 mb-10 w-full flex flex-col gap-10 items-center">
        <h1 className="text-2xl text-gray-900 font-semibold">Create Post</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            onChange={handleInputChange}
            type="text"
            id="title"
            className="rounded-md w-full py-2 px-2 bg-gray-200 border border-indigo-600 focus:outline-none focus:border-indigo-900 text-gray-900"
            placeholder="Title"
          />

          <div className="flex flex-col md:flex-row gap-2">
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="rounded-md py-2 px-2 grow border border-indigo-600 bg-gray-200 focus:outline-none focus:border-indigo-900 text-gray-900"
            />
            <button
              onClick={handleImageUpload}
              className={`bg-indigo-700 rounded-md hover:scale-95 transition-all px-2 py-2 text-sm text-white ${
                waiting && "pointer-events-none"
              }`}
            >
              {imgUploading ? (
                <ThreeDots height="40" width="60" color="white" ariaLabel="loading" />
              ) : (
                "Upload Image"
              )}
            </button>
          </div>

          {waiting && <p className="text-green-600 text-sm">{waiting}</p>}
          {imgUploadingError && <p className="text-red-500 text-sm">{imgUploadingError}</p>}
          {formData?.image && (
            <img
              src={formData.image}
              className="w-full h-[300px] border-2 border-indigo-700 rounded-md"
              alt="Uploaded"
            />
          )}

          <textarea
            onChange={handleInputChange}
            id="content"
            className="rounded-md w-full border border-indigo-600 bg-gray-200 text-gray-900 py-2 px-2 focus:outline-none focus:border-indigo-900"
            rows={10}
            placeholder="Write your post..."
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            className={`bg-indigo-700 py-2 px-2 hover:bg-indigo-800 transition-all ${
              imgUploading && "pointer-events-none cursor-not-allowed"
            } text-white font-medium rounded-md`}
          >
            {loading ? (
              <ThreeDots height="25" width="40" color="white" ariaLabel="loading" />
            ) : (
              "Publish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
