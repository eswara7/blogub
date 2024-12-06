import axios from "axios";
import { Appbar } from "../components/Appbar";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTitle = localStorage.getItem("blogTitle");
    const savedContent = localStorage.getItem("blogContent");

    if (savedTitle) {
      setTitle(savedTitle);
    }

    //checking content is retrieved correctly (Quill Delta content)
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent); // just Deserialize content (Quill Delta)
        setContent(parsedContent); // Setin the content as Quill Delta
      } catch (error) {
        console.error("Failed to parse saved content", error);
      }
    }
  }, []);
  useEffect(() => {
    if (title || content) {
      localStorage.setItem("blogTitle", title);
      try {
        localStorage.setItem("blogContent", JSON.stringify(content)); // Saving content (Quill Delta) to localStorage
      } catch (error) {
        console.error("Failed to save content", error);
      }
    }
  }, [title, content]);

  const createBlog = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/blog/create`,
        { title, content },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("blog published");
        navigate(`/blog/${response.data.id}`);
        localStorage.removeItem("blogTitle")
        localStorage.removeItem("blogContent")
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("blog not published");
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Toaster richColors position="bottom-center" />
      <Appbar />
      <div className="max-w-screen-lg mt-12 w-full">
        <div className="flex items-center justify-center">
          <div className="relative">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border-b border-gray-300 py-1 w-56 md:w-80 pl-14 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            />
            <label className="absolute m-1 text-md left-0 cursor-text font-bold peer-focus:text-ld peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-md">
              Title:
            </label>
          </div>
        </div>
      </div>
      <div className=" px-4 md:px-14 mt-8">
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
          }}
          formats={["header", "bold", "italic", "underline", "list", "link"]}
          placeholder="Write your blog here..."
        />
        <button
          onClick={createBlog}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded"
        >
          {isLoading ? (
            <div className="text-center px-5">
              <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-sky-300 mx-auto"></div>
            </div>
          ) : (
            "add blog"
          )}
        </button>
      </div>
    </div>
  );
};
