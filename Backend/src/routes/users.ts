import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@craiber/knowlwdgenest'

const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

userRoute.post('/signup', async (c) => {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())

      const body = await c.req.json()
      const { success } = signupInput.safeParse(body)

      if(!success){
        c.status(411)
        return c.json({
          msg: "Invalid Input"
        })
      }
      const existingUser = await prisma.author.findUnique({
        where: {
          email: body.email
        }
      })

      if(existingUser){
        return c.json({
          message: 'Email Already exist'
        })
      }
        try {
          const user = await prisma.author.create({
            data : {
              email: body.email,
              password: body.password,
              name: body.name
            }
          });
    
          const token = await sign({id: user.id}, c.env.JWT_SECRET);
    
          return c.json({
            msg: "User Created Successfull",
            jwt: token
          })
        }
        catch(error) {
          console.log(error);
          c.json(411);
          return c.json({
            msg: 'There is some issue'
          })
        }
    
})

userRoute.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const { success } = signinInput.safeParse(body)

      if(!success){
        c.status(411)
        return c.json({
          msg: "Invalid Input"
        })
      }
    
  const user = await prisma.author.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if(!user){
    c.status(403)
    return c.json({
      error: 'User Not Found'
    })
  }

  const token = await sign({id: user.id}, c.env.JWT_SECRET);

  return c.json({
    message: "You are signed in",
    jwt: token
  })


})

export default userRoute;