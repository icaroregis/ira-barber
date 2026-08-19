import z from "zod";

export const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }),
});

export type Values = z.infer<typeof formSchema>;
