import { DashboardLayout } from "./layout";
import { useAuth } from "~/components/Authentication";
import { useTenant } from "~/hooks/Tenant";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  return <DashboardLayout>Dashboard</DashboardLayout>;
}
