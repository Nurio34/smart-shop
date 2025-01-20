"use client";

import Link from "next/link";
import { SearchParamsType } from "../../page";

function Button({
  i,
  searchParams,
}: {
  i: number;
  searchParams: SearchParamsType;
}) {
  let isActive = searchParams.page === i.toString();
  if (!Boolean(searchParams.page) && i === 0) isActive = true;

  const url = new URL(`${process.env.NEXT_PUBLIC_URL}/explore`);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key !== "page") {
      url.searchParams.set(key, value || "");
    }
  });

  const isAnyParams = Object.keys(searchParams).length > 0;
  const isPageOnlyParams =
    Object.keys(searchParams).length === 1 &&
    Object.keys(searchParams)[0] === "page";

  const condition1 = !isAnyParams;
  const condition2 = isAnyParams && isPageOnlyParams;
  const condition = condition1 || condition2;

  const href = condition
    ? `${url.toString()}?page=${i}`
    : `${url.toString()}&page=${i}`;

  return (
    <Link
      href={href}
      type="button"
      className={`btn btn-sm ${isActive ? "btn-primary" : ""}`}
    >
      {i + 1}
    </Link>
  );
}
export default Button;
