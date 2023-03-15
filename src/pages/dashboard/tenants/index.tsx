import Link from "next/link";
import { useTenant } from "~/hooks/Tenant";
import { DashboardLayout } from "../layout";

export default function TenantsPage() {
  const { tenants, createTenant, deleteTenant } = useTenant();
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Tenants</h1>
          </div>
          <button
            className="primary"
            onClick={() => {
              createTenant();
            }}
          >
            New
          </button>
        </div>
        <ul className="flex flex-col items-center gap-5">
          {tenants.length === 0 && <li>No tenants</li>}
          {tenants.map((tenant) => (
            <li
              key={tenant.id}
              className="flex w-full max-w-md flex-row justify-between rounded border py-2 px-4"
            >
              <div className="flex items-center">
                <Link href={`/dashboard/tenants/${tenant.id}`}>
                  {tenant.id}
                </Link>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteTenant(tenant.id);
                  }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
}
