import { Product, User } from "@prisma/client";
import BotClient from "./Client";
import { prisma } from "@/lib/prisma";

export type UserWithHistory = User & {
  history: Product[];
};

async function BotServer({ user }: { user: UserWithHistory }) {
  const products = await prisma.product.findMany();
  const history = user.history;

  return <BotClient products={products} history={history} />;
}
export default BotServer;
