import { useEffect, useState } from "react"
import axios from "axios"

export interface blogsType {
    "title": string
    "id": string,
    "content": string,
    date:string,
    "author":{
        "name": string 
    }
}
export const useBlog = ({id}:{id:string})=>{
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState<blogsType>()
    useEffect(()=>{
       axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/blog/${id}`,{
        headers:{authorization:`Bearer ${localStorage.getItem("token")}`}
       }).then(response=>{setBlog(response.data.blog);setLoading(false)})
    },[id])
    return({
        loading,blog
    })
}
export const useBlogs =  ()=>{
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<blogsType[]>([])
    //doesnt support async so using then()
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/blog/bulk`,{
            headers:{authorization:`Bearer ${localStorage.getItem("token")}`}
        }).then(response=>{setBlogs(response.data.blogs);setLoading(false)})
    })
    return{
        loading,blogs
    }
}