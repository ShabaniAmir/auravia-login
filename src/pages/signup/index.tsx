import Head from "next/head";
import { useEffect, useState, useReducer } from "react";
import { api } from "~/utils/api";

export default function SignupPage() {
  const {
    mutateAsync: signUp,
    isSuccess: signUpSuccess,
    error: signupError,
  } = api.user.signUp.useMutation({});

  const [errors, setErrors] = useReducer((prev: string[], next: string) => {
    if (prev.includes(next)) {
      return prev;
    }
    if (next === "") {
      return [];
    }
    return [...prev, next];
  }, []);

  useEffect(() => {
    if (signupError) {
      setErrors(signupError.message);
    }
  }, [signupError]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }
    try {
      await signUp({ email, password });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">Welcome</h1>
          {errors &&
            errors.map((error) => (
              <p className="rounded border border-red-500 bg-red-200 p-3 text-red-700">
                {error}
              </p>
            ))}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                id="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div>
              <button type="submit" className="primary">
                Sign up
              </button>
            </div>
            <div>
              <p>Already have an account? </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
