import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const session = getSession();
  if (!session) redirect("/login");

  return <AdminClient />;
}
