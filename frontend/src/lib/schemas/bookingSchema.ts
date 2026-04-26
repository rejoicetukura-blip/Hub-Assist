import { z } from "zod";

export const bookingSchema = z
  .object({
    workspaceId: z.string().min(1, "Workspace is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine((d) => new Date(d.endTime) > new Date(d.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export type BookingFormValues = z.infer<typeof bookingSchema>;
