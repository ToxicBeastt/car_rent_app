"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { z } from 'zod'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	password: z.string().min(1, 'Password is required'),
})

const LogIn = () => {
    const router = useRouter();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    
    const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: '',
			password: '',
		}
	})

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
		setLoading(true)
		const loginData = await signIn('credentials', {
			username: data.username,
			password: data.password,
			redirect: false
		})
        console.log(loginData)
		setLoading(false)

		if (loginData?.error) {
			Swal.fire({
				title: 'Error!',
				text: loginData.error,
				icon: 'error',
				confirmButtonText: 'Try Again'
			})
		} else {
			Swal.fire({
				title: 'Success!',
				text: 'Logged In',
				icon: 'success',
				confirmButtonText: 'OK'
			})
			// router.push('/dashboard')
		}
	}

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        {...form.register('username')}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...form.register('password')}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded p-2">Login</button>
            </form>
        </div>
    );
};
export default LogIn;
