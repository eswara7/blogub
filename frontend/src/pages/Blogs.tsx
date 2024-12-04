import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks/blogHook"
export const Blogs = ()=>{
    const {loading,blogs}= useBlogs()
    if(loading){
        return <div className="max-w-lg flex flex-col p-2 gap-5 mx-auto">
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>

      </div>
    }
    return(
        <>
        <Appbar/>
        <div className="max-w-lg flex flex-col  p-4 gap-6 mx-auto">
            {blogs.map(blog=><BlogCard  key={Number(blog.id)} id={blog.id} authorName={blog.author.name || "anonymous"} title={blog.title} content={blog.content} publishDate={blog.date}/>)}
        </div>      
        </>
    )
}