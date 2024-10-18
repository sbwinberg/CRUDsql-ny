import React from "react";
import Input from "@/components/ui/LoginInput";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/LoginCheckbox";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import axios from 'axios';

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
  window.location.href = 'http://localhost:1337/auth/github';
};

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // function verifyLogin(e: React.FormEvent) {
  //   e.preventDefault()
  //   fetch('http://localhost:1337/auth/login', {
  //     method: 'POST',
  //     headers: {'Conent-Type': 'applications/json'},
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     })
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Success:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     })
  // }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(email, password)
      const response = await axios.post('http://localhost:1337/auth/login', {
        email,
        password,
      }, {
        withCredentials: true
      });
      console.log("Logged in successfully:", response.data);
      // Update this line to use the user ID from the response
    
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response)
      } else {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <form onSubmit={(e)=> handleSubmit(e)} className="space-y-4">
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
            onChange={(e)=> setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
      <Button type="submit" className="w-full mt-4 bg-black text-white" >Login</Button>
      <Button className="w-full mt-4 bg-black text-white flex items-center justify-center gap-2" onClick={handleGithubLogin}> <FaGithub />Login with Github  </Button>
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
