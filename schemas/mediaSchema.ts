import { z } from "zod";

export const addMediaSchema = z.object({
  url: z
    .string({
      error: "آدرس فایل الزامی است",
    })
    .trim()
    .min(1, "آدرس فایل نمی‌تواند خالی باشد")
    .url("لطفاً یک آدرس معتبر برای فایل وارد کنید"),
});

export const updateMediaSchema = z
  .object({
    url: z
      .string({
        error: "آدرس فایل باید رشته باشد",
      })
      .trim()
      .min(1, "آدرس فایل نمی‌تواند خالی باشد")
      .url("لطفاً یک آدرس معتبر برای فایل وارد کنید"),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "آدرس فایل برای به‌روزرسانی الزامی است",
  });
