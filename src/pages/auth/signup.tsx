import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "~/components/Authentication";
import AuthLayout from "./layout";

export default function SignupPage() {
  const { signup, token, loading } = useAuth();
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    signup(email, password);
  }
  if (token && !loading) {
    router.push("/");
    return <></>;
  }
  if (loading) return <div></div>;
  return (
    <AuthLayout>
      <form
        className="flex h-full w-full flex-col gap-5 p-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl">Create Account</h1>
        <span></span>
        <label className="flex flex-col">
          Email
          <input type="email" name="email" required />
        </label>
        <label className="flex flex-col">
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" className="primary">
          Sign up
        </button>
        <span></span>
        <span className="text-center">
          Already have an account? <Link href="/auth/login">Log in</Link>
        </span>
      </form>
    </AuthLayout>
  );
}
