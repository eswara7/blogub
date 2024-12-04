import { BlogSkeleton } from '../components/BlogSkeleton'
import { FullBlog } from '../components/FullBlog'
import { useBlog } from '../hooks/blogHook'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const {id} = useParams<{id:string}>()
  const{loading,blog} = useBlog({id:id || ""})

  if(loading || !blog){
    return <div className='mt-5'>
    <BlogSkeleton />
    <BlogSkeleton />
    <BlogSkeleton />
  </div>
  
  }
  return <div>
    <FullBlog blog={blog} />
    
  </div>
}

export default Blog