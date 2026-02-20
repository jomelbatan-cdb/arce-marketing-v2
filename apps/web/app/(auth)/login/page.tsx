import LoginForm from "@/components/Forms/LoginForm";
import RegisterForm from "@/components/Forms/RegisterForm";
import { arceAssets } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import google from "../../../public/google.svg";
import ClientImage from "@/components/MajorElements/ClientImage";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex items-center justify-center bg-primary-muted">
        <div className="flex flex-row items-center gap-8">
          <ClientImage
            src={arceAssets.ARCECascading}
            alt="ARCE Logo"
            className="h-8 md:min-h-screen w-fit"
          />
        </div>
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-start text-primary-dark">
            Login
          </h2>
          <LoginForm />

          <Link href={"/forgot-password"}>
            <p className="text-primary hover:text-primary-pastel w-fit text-xs py-2">
              Forgot Password?
            </p>
          </Link>
          <div className="flex flex-row items-center justify-center gap-2 mt-4">
            <div className="border-b border-gray-300 w-1/2"></div>
            <p className="text-gray-300">OR</p>
            <div className="border-b border-gray-300 w-1/2"></div>
          </div>
          <button className="flex flex-row gap-2 border-[0.1px] w-full items-center justify-center border-gray-300 py-2 px-4 my-2">
            <ClientImage src={google} alt="google_logo" className="size-6" />
            <p className="text-black/70">Continue with Google</p>
          </button>
          <p className="text-black/70 text-base text-center mt-4">
            New to ARCE?{" "}
            <Link
              href={"/register"}
              className="text-primary-dark hover:text-primary font-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
