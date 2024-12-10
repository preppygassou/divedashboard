import * as z from "zod"

export const userInfoSchema = z.object({
  billing: z.object({
    first_name: z.string().nonempty("First name is required"),
    last_name: z.string().nonempty("Last name is required"),
    address_1: z.string().nonempty("Address is required"),
    address_2: z.string().optional(),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    postcode: z.string().nonempty("Postal code is required"),
    country: z.string().nonempty("Country is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().nonempty("Phone number is required"),
    birthday: z.string().nonempty("Birthday is required"),
  }),
  shipping: z.object({
    first_name: z.string().nonempty("First name is required"),
    last_name: z.string().nonempty("Last name is required"),
    address_1: z.string().nonempty("Address is required"),
    address_2: z.string().optional(),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    postcode: z.string().nonempty("Postal code is required"),
    country: z.string().nonempty("Country is required"),
  }),
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;