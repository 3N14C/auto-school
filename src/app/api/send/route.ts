import { EmailTemplate } from "@/components/ui/email-template";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
  const user: User = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Drive Leader <onboarding@resend.dev>",
      to: user.email,
      subject: "Добро пожаловать в Drive Leader",
      react: EmailTemplate({
        email: user.email,
        phone: user.phone,
        password: user.password,
      }),
      text: "Добро пожаловать в Drive Leader, ваши данные для входа готовы",
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
