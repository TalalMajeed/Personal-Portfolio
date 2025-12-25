import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PanelHomePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-xl space-y-4 rounded-lg border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Panel
        </h1>
        <p className="text-sm text-muted-foreground">
          You are logged in. This is a placeholder for your admin dashboard.
          Replace this content with your actual panel pages and functionality.
        </p>
      </div>
    </div>
  );
}
