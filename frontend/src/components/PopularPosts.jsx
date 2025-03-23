import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import { NavLink } from "react-router-dom";

import { FaFire, FaHeart, FaClock, FaUser } from "react-icons/fa";
import Suggestion from "./Suggestions";

export const PopularPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/getallposts`
        );
        if (response.status === 200) {
          setLoading(false);
          const sortedPosts = response.data.posts.sort(
            (a, b) => b.likes.length - a.likes.length
          );
          const topThreePosts = sortedPosts.slice(0, 3);
          setAllPosts(topThreePosts);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full md:w-[40%] flex flex-col gap-6 p-2">
      {/* Popular Posts Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FaFire className="text-orange-500 text-xl" />
          <h1 className="text-xl font-bold text-gray-900">Popular Posts</h1>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <ThreeDots
              height="30"
              width="30"
              radius="9"
              color="#2563eb"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {allPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No posts available yet
              </p>
            ) : (
              allPosts.map((post) => (
                <NavLink
                  to={`/post/${post.slug}`}
                  key={post._id}
                  className="block group"
                >
                  <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <FaUser className="text-indigo-600 text-sm" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        @{post.author}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FaClock className="text-xs" />
                        <span>{moment(post.createdAt).fromNow()}</span>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Likes Count */}
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                      <FaHeart className="text-red-500" />
                      <span>
                        {post.likes.length}{" "}
                        {post.likes.length === 1 ? "like" : "likes"}
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        )}
      </div>

      {/* Suggestion Section */}
      <Suggestion />
    </div>
  );
};
