import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput, signupInput } from "@eswara1/blogub_common";

type Variables = {
    userId:string
    prisma:PrismaClient
  }
  
export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:Variables
  }>()

  //adding middleware
userRouter.use("*",async (c,next) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) as unknown as PrismaClient;

  c.set("prisma", prisma);
  await next()

})

userRouter.post("/signup",async (c)=>{
    const prisma = c.get("prisma")
      const body = await c.req.json()
      const isValid = signupInput.safeParse(body)
      if(!isValid.success){
        const errors = isValid.error.errors.map(err=>err.message)
         return c.json({success:false,message:errors},400)
     }
      const isExist = await prisma.user.findUnique({
        where:{email:body.email}
      })
      if(isExist) return c.json({success:false,message:"user already exist please signin"},403)
  
      try {
        const newUser = await prisma.user.create({
          data:{
            email:body.email,
            password:body.password,
            name:body.name
          }
        })
        const token = await sign({id:newUser.id},c.env.JWT_SECRET)
        return c .json({success:true,messege:"signup successful",token:token})
      } catch (error) {
          return c.json({success:false,message:"error while creating user"},411)
      }
  })
  
  
  userRouter.post("/signin",async (c)=>{
    const prisma = c.get('prisma')
    const body = await c.req.json()
    const isValid = signinInput.safeParse(body)
    if(!isValid.success){
      const errors = isValid.error.errors.map(err=>err.message)
       return c.json({success:false,message:errors},400)
   }
    try {
      const user = await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
    
      if(!user){
        c.status(403)
        return c.json({success:false,message:"user not found"})
      }
      const token = await sign({id:user.id},c.env.JWT_SECRET)
    
      return c.json({success:true,messega:"signin successful",token:token})
    } catch (error) {
      return c.json({success:false,message:"error while signin"},403)
    }
  })