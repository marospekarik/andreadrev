import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string().optional(),
      year: z.string().optional(),
      author: z.string().optional(),
      imageFolder: z.string(),
      videos: z.array(z.string()).optional(),
      tags: z.array(z.string()),
      cover: z.string(),
      slider: z.boolean().optional(),
    })
 });
const about = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});


export const collections = {
  posts: postsCollection,
  about
};