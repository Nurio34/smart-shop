"use server";

import { redirect } from "next/navigation";

export async function filterProducts(formData: FormData) {
  const category = formData.get("category");
  const minPrice = formData.get("minPrice");
  const maxPrice = formData.get("maxPrice");
  const sortBy = formData.get("sort");
  const tags = formData.get("tag");
  const rating = formData.get("rating");

  const url = new URL(`${process.env.NEXT_PUBLIC_URL}/explore`);

  //! set the search params conditionally
  if (category) url.searchParams.set("category", category as string);
  if (minPrice) url.searchParams.set("minPrice", minPrice as string);
  if (maxPrice) url.searchParams.set("maxPrice", maxPrice as string);
  if (sortBy) url.searchParams.set("sort", sortBy as string);
  if (tags) url.searchParams.set("tag", tags as string);
  if (rating) url.searchParams.set("rating", rating as string);

  redirect(url.toString());
}
