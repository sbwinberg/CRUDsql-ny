import React from "react";
import Input from "@/components/ui/LoginInput";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/LoginCheckbox";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

type IconProps = React.SVGProps<SVGSVGElement>;
const LockIcon = (props: IconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LogInIcon = (props: IconProps) => (
  <>
    <Link to="/">
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
      </svg>
    </Link>
  </>
);

const MailIcon = (props: IconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Header = () => (
  <header className="w-full py-4 bg-white shadow">
    <div className="container mx-auto">
      <LogInIcon className="w-8 h-8 mx-auto" />
    </div>
  </header>
);

const handleGithubLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  window.location.href = "http://localhost:1337/auth/github";
};

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <div className="relative mt-1">
          <Input
            type="email"
            id="email"
            placeholder="m@example.com"
            className="w-full pl-3 pr-10"
          />
          <MailIcon className="absolute right-2 top-2.5 h-4 w-4 text-red-500" />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <div className="relative mt-1">
          <Input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full pl-3 pr-10"
          />
          <LockIcon className="absolute right-2 top-2.5 h-4 w-4 text-red-500" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            id="remember"
            label="Remember me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked)}
          />
        </div>
        <Link to="#" className="text-sm text-blue-600">
          Forgot Password?
        </Link>
      </div>
      <Button className="w-full mt-4 bg-black text-white">Login</Button>
      <Button
        className="w-full mt-4 bg-black text-white flex items-center justify-center gap-2"
        onClick={handleGithubLogin}
      >
        {" "}
        <FaGithub />
        Login with Github{" "}
      </Button>
    </form>
  );
};

const LoginComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <div className="max-w-md p-8 bg-white rounded shadow">
          <div className="flex flex-col items-center mb-6">
            <LogInIcon className="w-10 h-10 mb-2" />
            <h1 className="text-2xl font-semibold">Welcome to Acme Email</h1>
          </div>
          <LoginForm />
        </div>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LoginComponent;
