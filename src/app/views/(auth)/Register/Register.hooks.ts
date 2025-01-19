import { useState } from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostData } from "@/app/hooks/useMutateData";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./Register.types";

const useRegister = () => {
    const router = useRouter();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const { register, handleSubmit, reset} = useForm<z.infer<typeof RegisterForm>>({
      resolver: zodResolver(RegisterForm),
      defaultValues: {
        username: "",
        fullname: "",
        password: "",
        contact: "",
        address: "",
        sim_number: "",
      },
    });
  
    const { mutate: mutateUser } = usePostData(`api/auth/register`);
  
    const onSubmit = async (data: z.infer<typeof RegisterForm>) => {
      mutateUser(data)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Data Berhasil Ditambah",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
              if (result.isConfirmed){
                  router.push('/login');
              }
          });
        })
        .catch((err) =>
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Try Again",
          })
        );
    };

    return {
        error,
        loading,
        register,
        handleSubmit,
        onSubmit
    }
}

export default useRegister;