import { z } from "zod";

export const createIncidentSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description: z
      .string()
      .min(1, "Description is required.")
      .max(65535),
  });

  export const patchIncidentSchema = z.object({
    title: z
      .string()
      .min(1, "Title is required.")
      .max(255)
      .optional(),
    description: z
      .string()
      .min(1, "Description is required.")
      .max(65535)
      .optional()
  });