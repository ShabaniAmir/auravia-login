import { APIKeyType } from "~/models/apiKey";
import { useAuth } from "~/components/Authentication";

export function useApiKey() {
  const { token } = useAuth();
  async function getApiKeys(tenantId: string) {
    const data = await fetch(`/api/tenants/${tenantId}/keys`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { keys } = await data.json();
    return keys as APIKeyType[];
  }

  async function createApiKey(tenantId: string) {
    const data = await fetch(`/api/tenants/${tenantId}/keys`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { key } = await data.json();
    return key as APIKeyType;
  }

  return {
    getApiKeys,
    createApiKey,
  };
}
