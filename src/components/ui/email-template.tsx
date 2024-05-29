import * as React from "react";

interface EmailTemplateProps {
  email: string;
  phone: string;
  password: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  phone,
  password,
}) => (
  <div>
    <h1>Ваша почта: {email}</h1>
    <h1>Ваш номер телефона для входа: {phone}</h1>
    <h1>Ваш пароль для входа: {password}</h1>
  </div>
);
