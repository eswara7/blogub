import dayjs from "dayjs";
import { blogsType } from "../hooks/blogHook";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import parse from 'html-react-parser';


export const FullBlog = ({ blog }: { blog: blogsType }) => {
  const formattedDate = dayjs(blog.date).format("MMM D YYYY");

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="md:grid grid-cols-12 px-10 mt-10 max-w-screen-lg ">
          <div className="col-span-8">
            <div className="text-4xl font-extrabold">{blog.title}</div>
            <div className="text-slate-600 mt-2">post on {formattedDate}</div>
            <div className="prose max-w-none text-sm">{parse(blog.content)}</div>
          </div>
          <div className="md:col-span-4 mt-4 md:ml-4">
            <div>
              Author
              <div className="flex gap-1">
                <div className="items-center"><Avatar name={blog.author.name || "Anonymous"} /></div>
               <div> <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className=" text-gray text-sm italic">
                  Turning thoughts into words, one story at a time
                </div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
