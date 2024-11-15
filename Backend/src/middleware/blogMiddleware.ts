import { verify } from 'hono/jwt';
import { MiddlewareHandler } from 'hono';

const blogMiddleware: MiddlewareHandler<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
  Variables: {
    user_id: string;
  };
}> = async (c, next) => {
  console.log('hello')
  const headerAuth = c.req.header('authorization') || "";
  const token = headerAuth.split(' ')[1];
  
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    console.log(response.id);
    if (response && typeof response.id === 'string') {
      c.set('user_id' , response.id);
      await next();
    } else {
      return c.json({ message: 'Unauthorized: Invalid token' }, 401);
    }
  } catch (error) {
    return c.json({ message: 'Unauthorized: Token verification failed' }, 401);
  }
};

export default blogMiddleware;
