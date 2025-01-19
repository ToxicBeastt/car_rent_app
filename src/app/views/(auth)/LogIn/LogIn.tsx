"use client";

import Link from "next/link";
import useLogIn from "./LogIn.hooks";

const LogIn = () => {
    const {
        error,
        register, 
        handleSubmit,
        onSubmit
    } = useLogIn();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-6 rounded shadow-md"
      >
        <h2 className="text-lg font-bold mb-4 text-white">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            {...register("username")}
            className="border rounded w-full p-2 bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="border rounded w-full p-2 bg-gray-700 text-white"
            required
          />
        </div>
        <p>
          Don't have an account? <Link href="/register">Register here</Link>
        </p>
        <button type="submit" className="bg-blue-600 text-white rounded p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LogIn;
