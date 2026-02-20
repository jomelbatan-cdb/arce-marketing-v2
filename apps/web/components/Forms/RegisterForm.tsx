"use client";

import React, { useState } from "react";
import FormField from "@/components/fields/FormField";
import PasswordField from "@/components/fields/PasswordField";
import CTAButton from "@/components/Button/CTAButton";
import { useAuthentication } from "@/hooks/useAuthentication";

export default function RegisterForm({}) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { registerUser, isRegisterLoading } = useAuthentication();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
      />
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
        text="Register"
        type="submit"
        className="w-full mt-4"
        isLoading={isRegisterLoading}
      />
    </form>
  );
}
