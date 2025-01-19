"use client";

import useRegister from "./Register.hooks";

const Register = () => {
    const {
        error,
        loading,
        register,
        handleSubmit,
        onSubmit
    } = useRegister();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-6 rounded shadow-md"
      >
        <h2 className="text-lg font-bold mb-4 text-white">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-300"
            htmlFor="username"
          >
            username
          </label>
          <input
            id="username"
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
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-300"
            htmlFor="password"
          >
            Contact
          </label>
          <input
            id="contact"
            {...register("contact")}
            className="border rounded w-full p-2 bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-300"
            htmlFor="password"
          >
            Address
          </label>
          <input
            id="address"
            {...register("address")}
            className="border rounded w-full p-2 bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-300"
            htmlFor="password"
          >
            Phone number
          </label>
          <input
            id="phone_number"
            {...register("phone_number")}
            className="border rounded w-full p-2 bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-300"
            htmlFor="password"
          >
            SIM number
          </label>
          <input
            id="sim_number"
            {...register("sim_number")}
            className="border rounded w-full p-2 bg-gray-700 text-white"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white rounded p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
