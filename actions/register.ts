"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email déjà utilisé !" };
  }
  const username = generateUniqueUsername(name)

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Email de confirmation envoyé !" };
};


function generateUniqueUsername(name: string){
  const baseUsername = name.toLowerCase().replace(/\s+/g, '');
  let username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;

  return username;
}
