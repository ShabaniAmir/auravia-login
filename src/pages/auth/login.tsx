import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "~/components/Authentication";
import AuthLayout from "./layout";

export default function LoginPage() {
  const { token, loading, login } = useAuth();
  const router = useRouter();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    login(email, password);
  }

  if (token && !loading) {
    router.push("/");
    return <></>;
  }
  if (loading) return <div></div>;

  return (
    <AuthLayout>
      <form
        className="flex flex-col gap-5 rounded p-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl">Welcome</h1>
        <span></span>
        <label className="flex flex-col">
          Email
          <input type="email" name="email" />
        </label>
        <label className="flex flex-col">
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit" className="primary">
          Login
        </button>
        <span></span>
        <span className="text-center">
          Don't have an account? <Link href="/auth/signup">Sign up</Link>
        </span>
      </form>
    </AuthLayout>
  );
}
