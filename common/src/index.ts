import {z} from "zod"


export const signupInput = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(8,{message:"password should atleast be 8 characters long "}).regex(/[a-z]/,{message:"password should atleast contain one lowercase letter"}).regex(/[A-Z]/,{message:"password should atleast contain one uppercase letter "}).regex(/[0-9]/,{message:"password should alteast have one number"})
})

export type signupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:"password should atleast be 8 characters long "}).regex(/[a-z]/,{message:"password should atleast contain one lowercase letter"}).regex(/[A-Z]/,{message:"password should atleast contain one uppercase letter "}).regex(/[0-9]/,{message:"password should alteast have one number"})
})

export type signinInput = z.infer<typeof signinInput>


export const createBlogInput = z.object({
    title:z.string(),
    content:z.string()
})

export type createBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    id:z.string(),
    title:z.string(),
    content:z.string()
})

export type updateBlogInput = z.infer<typeof updateBlogInput>
 