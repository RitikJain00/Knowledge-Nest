import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import blogMiddleWare from "../middleware/blogMiddleware";
import { createPost, updatePost } from "@craiber/knowlwdgenest";

const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
  Variables: {
    user_id: string;
  };
}>();

blogRoute.use('/*', blogMiddleWare);

blogRoute.post('/create', async (c) => {
  const body = await c.req.json();

  const { success } = createPost.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      msg: "Invalid Input"
    })
  }

    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
   
      let id = c.get('user_id');
      
      const post = await prisma.post.create({
       data: {
         title: body.title,
         content: body.content,
         authorId: id,
       }
      })
   
      return c.json({
       message: `Post is Created post id is: ${post.id}`
     })
    }
    catch(error){
     
      console.log(error)
      return c.json({
        msg: 'There is an issue'
      })
    }
    
})

blogRoute.put('/update', async (c) => {

  const body = await c.req.json();

  const { success } = updatePost.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      msg: "Invalid Input"
    })
  }
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const post = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })

  return c.text(`Updatation Successfull`)
})


blogRoute.get('/bulk', async (c) => {
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({})

  return c.json({
    posts
  })
})


blogRoute.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const post = await prisma.post.findUnique({
    where: {
      id
    }
  })

  return c.json({
    post
  })
})





export default blogRoute;