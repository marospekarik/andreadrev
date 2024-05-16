import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      imageFolder: z.string(),
      videos: z.array(z.string()).optional(),
      tags: z.array(z.string()),
      cover: z.string(),
    })
 });

export const collections = {
  posts: postsCollection,
};