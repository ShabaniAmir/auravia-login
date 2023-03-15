import Link from "next/link";
import { ProtectedPage } from "~/components/Authentication";
export function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <ProtectedPage>
      <div className="flex h-full flex-row gap-5">
        <div className="h-full w-52 shadow">
          <nav className="py-10">
            <ul>
              <NavItem href="/dashboard">Dashboard</NavItem>
              <NavItem href="/dashboard/tenants">Tenants</NavItem>
            </ul>
          </nav>
        </div>
        <div className="flex w-full flex-col items-center p-10">
          <div className="w-full max-w-screen-md">{children}</div>
        </div>
      </div>
    </ProtectedPage>
  );
}
function NavItem({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href}>
      <li className="px-10 py-3">{children}</li>
    </Link>
  );
}
