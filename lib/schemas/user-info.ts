import * as z from "zod"

export const userInfoSchema = z.object({
  billing: z.object({
    first_name: z.string().nonempty("Prénom est requis"),
    last_name: z.string().nonempty("Nom est requis"),
    address_1: z.string().nonempty("Adresse est requise"),
    address_2: z.string().optional(),
    city: z.string().nonempty("Ville est requise"),
    state: z.string().nonempty("État est requis"),
    postcode: z.string().nonempty("Code postal est requis"),
    country: z.string().nonempty("Pays est requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().nonempty("Numéro de téléphone est requis"),
    birthday: z.string().nonempty("Date de naissance est requise"),
  }),
  shipping: z.object({
    first_name: z.string().nonempty("Prénom est requis"),
    last_name: z.string().nonempty("Nom est requis"),
    address_1: z.string().nonempty("Adresse est requise"),
    address_2: z.string().optional(),
    city: z.string().nonempty("Ville est requise"),
    state: z.string().nonempty("État est requis"),
    postcode: z.string().nonempty("Code postal est requis"),
    country: z.string().nonempty("Pays est requis"),
  }),
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;