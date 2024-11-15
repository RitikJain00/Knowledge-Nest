import { Hono } from 'hono'
import userRoute from './routes/users';
import blogRoute from './routes/blog';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
  Variables: {
    user_id: string;
  }
}>();


app.route('/users', userRoute);
app.route('/blogs', blogRoute)


export default app;