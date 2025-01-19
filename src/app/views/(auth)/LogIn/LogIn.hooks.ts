import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "./LogIn.types";
import { z } from "zod";

const useLogIn = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const {register, handleSubmit} = useForm<z.infer<typeof LoginForm>>({
      resolver: zodResolver(LoginForm),
      defaultValues: {
        username: "",
        password: "",
      },
    });
  
    const onSubmit = async (data: z.infer<typeof LoginForm>) => {
      setLoading(true);
      const loginData = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      setLoading(false);
  
      if (loginData?.error) {
        Swal.fire({
          title: "Error!",
          text: loginData.error,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Logged In",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/dashboard");
          }
        });
      }
    };

    return {
        error,
        register, 
        handleSubmit,
        onSubmit
    }
}

export default useLogIn;