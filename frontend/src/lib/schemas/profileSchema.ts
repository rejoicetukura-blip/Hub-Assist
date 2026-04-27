import { z } from "zod";

export const profileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  stellarPublicKey: z
    .string()
    .optional()
    .refine((v) => !v || /^G[A-Z2-7]{55}$/.test(v), {
      message: "Enter a valid Stellar public key (starts with G, 56 chars)",
    }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
