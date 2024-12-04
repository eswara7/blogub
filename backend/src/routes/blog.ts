import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@eswara1/blogub_common";
type Variables = {
    prisma:PrismaClient
    userId:string
}
export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:Variables
}>()

blogRouter.use("*",async (c,next) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) as unknown as PrismaClient;
  c.set("prisma", prisma);
  await next()

})

blogRouter.use("/*",async (c,next)=>{
  const header = c.req.header("Authorization") || ""
  if(!header){
    c.status(401)
    return c.json({success:false,message:"unauthorized"})
  }
  try {
    const token = header.split(" ")[1]
    const decoded = await verify(token,c.env.JWT_SECRET)

  if(!decoded.id){
    c.status(401)
    return c.json({success:false,message:"unauthorized"})
  }
  c.set("userId", decoded.id as string);
    await next()
  } catch (error) {
    return c.json({success:false,message:"unauthorized"},401)

  }
})

blogRouter.post("/create",async (c)=>{
    const prisma = c.get("prisma")
    const userId = c.get("userId")
    const body =await  c.req.json()
    const isValid = createBlogInput.safeParse(body)
    if(!isValid.success){
      const errors = isValid.error.errors.map(err=>err.message)
       return c.json({success:false,message:errors},400)
   }
    try {

       const newBlog =  await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                date:new Date(),
                authorId:userId
            }
        })
        return c.json({success:true,message:"blog created",id:newBlog.id})
        
    } catch (error) {
        return c.json({success:false,message:"blog creation failed"},400)
    }
  })
  
  
  blogRouter.put("/update",async (c)=>{
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const isValid = updateBlogInput.safeParse(body)
    if(!isValid.success){
      const errors = isValid.error.errors.map(err=>err.message)
       return c.json({success:false,message:errors},400)
   }
   try {
    const updatedBlog = await prisma.blog.update({
        where:{id:body.id},
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.json({success:true,message:"blog updated",id:updatedBlog.id})
   } catch (error) {
    return c.json({success:false,message:"blog updation failed"},400)
   }
  })
  
// Todo : add pagination here 
  blogRouter.get("/bulk",async (c)=>{
    const prisma = c.get("prisma")
    try {
        const blogs = await prisma.blog.findMany({
          select:{
            title:true,
            id:true,
            content:true,
            date:true,
            author:{
              select:{
                name:true
              }
            }
          }
        })
      return c.json({success:true,message:"blogs fetched",blogs:blogs})
    } catch (error) {
        return c.json({success:false,message:"blogs fetch failed"},400)
    }
  })

  blogRouter.get("/:id",async (c)=>{
    const id = c.req.param('id')
    const prisma = c.get("prisma")

    try {
        const blog = await prisma.blog.findUnique({
            where:{id:id},
            select:{
              title:true,
              id:true,
              content:true,
              date:true,
              author:{
                select:{
                  name:true
                }
              }
            }
        })
        if(!blog) return c.json({success:false,message:"blog not found"},400)

        return c.json({success:true,message:"blog fetched successfully",blog})
    } catch (error) {
        return c.json({success:false,message:"couldn't get the blog"},400)
    }
  })
  

   