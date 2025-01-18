import { prisma } from "@/lib/prisma";
import Filters from "./_components/Filters";
import Pagination from "./_components/Pagination";
import Products from "./_components/Products";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export interface SearchParamsType {
  page: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  tag: string;
  rating: string;
}

async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  // Await searchParams before using its properties
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
  //! type for filters
  type Filters = {
    category?: string;
    price?: { gte: number; lte?: number };
    tags?: { has: string };
    rating?: { gte: number };
  };
  //! ***
  const filters: Filters = {};

  if (category) filters.category = category;
  if (minPrice) {
    filters.price = { gte: parseFloat(minPrice) };
    if (maxPrice) {
      filters.price.lte = parseFloat(maxPrice);
    }
  } else if (maxPrice) {
    filters.price = { gte: 0, lte: parseFloat(maxPrice) };
  }
  if (tag) filters.tags = { has: tag };
  if (rating) filters.rating = { gte: parseFloat(rating) };

  //! type for sort options
  type SortOptions = {
    price?: "asc" | "desc";
    rating?: "desc";
    createdAt?: "desc";
  };
  //! ***
  const sortOptions: SortOptions = {};

  if (sort === "price_asc") sortOptions.price = "asc";
  if (sort === "price_desc") sortOptions.price = "desc";
  if (sort === "rating") sortOptions.rating = "desc";
  if (sort === "createdAt") sortOptions.createdAt = "desc";

  const [totalCount, products] = await prisma.$transaction([
    prisma.product.count({ where: filters }),
    prisma.product.findMany({
      where: filters,
      take: 30,
      skip: (parseInt(page) || 0) * 30,
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

  const totalPaginationButtons = Math.ceil(totalCount / 30);

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
