import { currentUser } from "@clerk/nextjs/server";
import SearchClient from "./Client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function Search() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) return redirect("/home");

  const role = user.role;

  return <>{role === "USER" ? <SearchClient /> : null}</>;
}
export default Search;
