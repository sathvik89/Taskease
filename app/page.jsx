// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export default async function Home() {
//   // Check if user is authenticated
//   const session = await getServerSession(authOptions);

//   // If authenticated, redirect to dashboard, otherwise to login
//   if (session) {
//     redirect("/dashboard");
//   } else {
//     redirect("/login");
//   }
// }
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);

  // If authenticated, redirect to dashboard, otherwise to login
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  // This is just a fallback, it should never be rendered
  return null;
}
