/* import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      )
    }

    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "L'email existe déjà" },
        { status: 400 }
      )
    }
   

    const username = generateUniqueUsername(name)


    const hashedPassword = await hash(password, 10)
    const user = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        username: user.username,
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Quelque chose a mal tourné" },
      { status: 500 }
    )
  }
}

 
function generateUniqueUsername(name: string){
  const baseUsername = name.toLowerCase().replace(/\s+/g, '');
  let username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;

  return username;
} */