import { prisma } from "@/lib/prisma";
import Filters from "./_components/Filters";
import Pagination from "./_components/Pagination";
import Products from "./_components/Products";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function ExplorePage({
  searchParams,
}: {
  searchParams: {
    page: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
    tag: string;
    rating: string;
  };
}) {
  const { page, category, minPrice, maxPrice, sort, tag, rating } =
    await searchParams;

  const clerkUser = await currentUser();
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id,
    },
  });

  if (!user) {
    return redirect("/home");
  }

  if (user.role !== "USER") {
    return redirect("/home");
  }

  const filters: any = {};

  if (category) filters.category = category;
  if (minPrice) filters.price = { gte: parseFloat(minPrice) };
  if (maxPrice) filters.price = { ...filters.price, lte: parseFloat(maxPrice) };
  if (tag) filters.tags = { has: tag }; // Use `has` for array fields
  if (rating) filters.rating = { gte: parseFloat(rating) };

  const sortOptions: any = {};
  if (sort === "price_asc") sortOptions.price = "asc";
  if (sort === "price_desc") sortOptions.price = "desc";
  if (sort === "rating") sortOptions.rating = "desc";
  if (sort === "createdAt") sortOptions.createdAt = "desc";

  const [totalCount, products] = await prisma.$transaction([
    prisma.product.count({ where: filters }),
    prisma.product.findMany({
      where: filters,
      take: 10,
      skip: (parseInt(page) || 0) * 10,
      orderBy: sortOptions,
      include: {
        seller: {
          select: {
            brand: true,
          },
        },
      },
    }),
  ]);

  const totalPaginationButtons = Math.ceil(totalCount / 10);

  return (
    <main
      className="px-[1vw] py-[1vh]
      grid gap-y-[1vh] grid-rows-[auto,1fr,auto]
    "
    >
      <Filters />
      <Products products={products} />
      <Pagination
        totalPaginationButtons={totalPaginationButtons}
        searchParams={await searchParams}
      />
    </main>
  );
}

export default ExplorePage;
