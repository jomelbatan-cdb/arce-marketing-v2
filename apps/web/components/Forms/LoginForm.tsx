"use client";

import React, { useState } from "react";
import FormField from "@/components/fields/FormField";
import PasswordField from "@/components/fields/PasswordField";
import CTAButton from "@/components/Button/CTAButton";
import { useAuthentication } from "@/hooks/useAuthentication";

export default function LoginForm({}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser, isLoginLoading } = useAuthentication();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <PasswordField
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <CTAButton
        text="Login"
        type="submit"
        className="w-full mt-4"
        isLoading={isLoginLoading}
      />
    </form>
  );
}
