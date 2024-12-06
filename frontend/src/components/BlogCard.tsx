import clsx from "clsx";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

interface blogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishDate:string
    id:string
}
export const BlogCard = ({authorName,title,content,publishDate,id}:blogCardProps)=>{
    const words = Math.ceil(content.split(/\s+/).length);
    const readEstimate =Math.ceil(words/200)
    const formattedDate = dayjs(publishDate).format("MMM DD YYYY")
    return(
        <Link to={`/blog/${id}`}>
         <div className="border-b border-slate-200 pb-4 cursor-pointer">
        <div className="flex items-center gap-1">
                <Avatar name={authorName}/>
            <div className="font-extralight text-sm">{authorName}</div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div> 
            <div className="text-sm font-light text-slate-500">{formattedDate}</div>
        </div> 
        <div className="text-xl font-semibold mt-2">{title}</div>
        <div className="text-md font-thin prose max-w-none text-sm">{parse(content.split(" ").slice(0,30).join(" ")+"...")}</div>
        <div className="text-slate-500 font-light text-sm mt-2">{readEstimate>1?readEstimate+" minutes read":"less than a minute"}</div>
    </div>
        </Link>
    )
}


export const Avatar =({name,size="sm"}:{name:string,size?:"sm"|"md"|"lg"})=>{
    return <div className={clsx("relative inline-flex items-center justify-center",
    {"w-4 h-4":size==="sm","w-6 h-6":size==="md","w-8 h-8":size==="lg"},
    "overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600")}>
        <span className={clsx("font-bold  text-gray-600 dark:text-gray-300",{"text-xs":size==="sm","text-md":size==="md","text-lg":size==="lg"})}>{name[0].toUpperCase()}</span>
    </div>
    
}