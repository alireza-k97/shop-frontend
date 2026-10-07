import { z } from "zod";

export const objectIdSchema = z
  .string({
    error: "شناسه باید رشته باشد",
  })
  .regex(/^[0-9a-fA-F]{24}$/, "شناسه وارد شده معتبر نمی‌باشد");
