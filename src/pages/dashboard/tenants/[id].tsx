import { DashboardLayout } from "../layout";
import { useRouter } from "next/router";
import { useTenant } from "~/hooks/Tenant";
import { useApiKey } from "~/hooks/ApiKey";
import { APIKeyType } from "~/models/apiKey";
import { useState, useEffect } from "react";
import { TenantType } from "~/models";
export default function TenantPage() {
  const router = useRouter();
  const { id } = router.query;
  if (!id || typeof id !== "string")
    return <DashboardLayout>Loading...</DashboardLayout>;
  const { tenants } = useTenant();
  const tenant = tenants.find((tenant) => tenant.id === id) as TenantType;

  const [keys, setKeys] = useState<APIKeyType[]>([]);

  const { getApiKeys, createApiKey } = useApiKey();
  useEffect(() => {
    if (id) getApiKeys(id as string).then((keys) => setKeys(keys));
  }, [id]);
  useEffect(() => {
    console.log({ keys });
  }, [keys]);

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
        <div className="flex flex-col gap-10 rounded border p-10">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold">Api Keys</h1>
            </div>
            <div>
              <button
                className="primary"
                onClick={() => {
                  createApiKey(id).then((key) => {
                    setKeys([...keys, key]);
                  });
                }}
              >
                Create API Key
              </button>
            </div>
          </div>
          <ul className="flex flex-col items-center gap-5">
            {keys.length === 0 && (
              <li className="flex flex-col items-center justify-center">
                <h4 className="text-lg font-bold">No API Keys</h4>
                <h5 className="text-slate-500">
                  You can create an API key for this tenant
                </h5>
              </li>
            )}
            {keys.length > 0 &&
              keys.map((key) => (
                <li className="flex w-full flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <h4 className="">{key.key}</h4>
                  </div>
                  <div className="flex flex-row gap-5">
                    <button className="danger">X</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
