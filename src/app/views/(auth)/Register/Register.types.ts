import { z } from "zod";

export const RegisterForm = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  contact: z.string().min(1, "Contact is required"),
  address: z.string().min(1, "Address is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  sim_number: z.string().min(1, "SIM number is required"),
});
