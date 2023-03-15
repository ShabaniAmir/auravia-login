import { createContext, useContext, useEffect, useState } from "react";
import { Tenant } from "@prisma/client";
import { useAuth } from "~/components/Authentication";

export type TenantContextType = {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  tenants: Tenant[];
  setTenants: (tenants: Tenant[]) => void;
  loading: boolean;
  fetchTenants: () => Promise<void>;
  createTenant: () => Promise<void>;
  deleteTenant: (id: string) => Promise<void>;
};

const TenantContext = createContext<TenantContextType | null>(null);

export function TenantProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const tenantString = localStorage.getItem("tenant");
    if (tenantString) {
      setCurrentTenant(JSON.parse(tenantString));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      fetchTenants();
    }
  }, [token]);

  async function fetchTenants() {
    const response = await fetch("/api/tenants", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log({ data });
    setTenants(data.tenants);
  }

  async function createTenant() {
    const response = await fetch("/api/tenants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log({ data });
    if (response.ok) {
      setTenants([...tenants, data.tenant]);
    }
  }

  async function deleteTenant(id: string) {
    const response = await fetch(`/api/tenants/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log({ data });
    if (response.ok) {
      setTenants(tenants.filter((tenant) => tenant.id !== id));
    }
  }

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        setCurrentTenant,
        tenants,
        setTenants,
        loading,
        fetchTenants,
        createTenant,
        deleteTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
