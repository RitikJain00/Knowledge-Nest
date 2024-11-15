import  z  from 'zod'

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  name: z.string()
})

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export const createPost = z.object({
  title : z.string(),
  content : z.string(),
  authorId: z.string()
})

export const updatePost = z.object({
  title : z.string(),
  content : z.string(),

})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreatePost = z.infer<typeof createPost>
export type UpdatePost = z.infer<typeof updatePost>