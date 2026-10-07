import { z } from "zod";
import { objectIdSchema } from "./common";

export const addProductSchema = z.object({
  name: z
    .string({
      error: "نام محصول باید رشته باشد",
    })
    .trim()
    .min(1, "نام محصول نمی‌تواند خالی باشد")
    .max(150, "نام محصول نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد"),

  price: z.coerce
    .number({
      error: "قیمت باید عدد باشد",
    })
    .min(0, "قیمت محصول نمی‌تواند منفی باشد"),

  sale: z.coerce
    .number({
      error: "تخفیف باید عدد باشد",
    })
    .min(0, "تخفیف نمی‌تواند منفی باشد")
    .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد")
    .default(0),

  media: z
    .array(objectIdSchema)
    .min(1, "حداقل یک شناسه رسانه برای محصول الزامی است"),

  category: objectIdSchema,

  brand: objectIdSchema,
});

export const updateProductSchema = z
  .object({
    name: z
      .string({
        error: "نام محصول باید رشته باشد",
      })
      .trim()
      .min(1, "نام محصول نمی‌تواند خالی باشد")
      .max(150, "نام محصول نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد"),
    price: z.coerce
      .number({
        error: "قیمت باید عدد باشد",
      })
      .min(0, "قیمت محصول نمی‌تواند منفی باشد"),
    sale: z.coerce
      .number({
        error: "تخفیف باید عدد باشد",
      })
      .min(0, "تخفیف نمی‌تواند منفی باشد")
      .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد"),
    media: z
      .array(objectIdSchema)
      .min(1, "حداقل یک شناسه رسانه برای محصول الزامی است"),
    category: objectIdSchema,

    brand: objectIdSchema,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "حداقل یکی از فیلدها برای به‌روزرسانی الزامی است",
  });
