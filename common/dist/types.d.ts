import z from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    authorId: string;
}, {
    title: string;
    content: string;
    authorId: string;
}>;
export declare const updatePost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreatePost = z.infer<typeof createPost>;
export type UpdatePost = z.infer<typeof updatePost>;
