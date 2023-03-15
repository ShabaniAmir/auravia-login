import { useAuth } from "~/components/Authentication";

export default function LogoutPage() {
  const { logout } = useAuth();
  logout();
  return <></>;
}
