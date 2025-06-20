"use client";
import React from "react";
import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const AuthForm = ({type} : {type: FormType}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const isSignin = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Intervio</h2>
        </div>

        <h3>Practice Job Interviews with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form" >
             {!isSignin  && <p>Name</p>}
             <p>Email</p>
             <p>Password</p>
            <Button type="submit">{isSignin ? 'Sign-in' : 'Create an Accont'}</Button>
          </form>
        </Form>
        <p className="text-center">{isSignin ? 'No Account yet' : 'Already have an Account'} <Link href={!isSignin ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1"> {!isSignin ? 'Sign-in' : 'Sign-up'} </Link></p>
      </div>
    </div>
  );
};

export default AuthForm;
