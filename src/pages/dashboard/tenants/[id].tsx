import { DashboardLayout } from "../layout";
import { useRouter } from "next/router";
import { useTenant } from "~/hooks/Tenant";
export default function TenantPage() {
  const router = useRouter();
  const { id } = router.query;
  const { tenants } = useTenant();
  const tenant = tenants.find((tenant) => tenant.id === id);
  if (!tenant) {
    return <DashboardLayout>Not found</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Tenant</h1>
            <h2 className="text-slate-500">{tenant.id}</h2>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">API Keys</h3>
          <ul className="flex flex-col items-center gap-5"></ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
