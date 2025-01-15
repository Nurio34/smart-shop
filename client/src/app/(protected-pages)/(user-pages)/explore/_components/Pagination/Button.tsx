"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Button({
  i,
  searchParams,
}: {
  i: number;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = useSearchParams();
  const page = params.get("page") || "0";
  const isActive = page === i.toString();

  const url = new URL(`${process.env.NEXT_PUBLIC_URL}/explore`);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key !== "page") {
      url.searchParams.set(key, value || "");
    }
  });

  return (
    <Link
      href={`${url.toString()}&page=${i}`}
      type="button"
      className={`btn btn-sm ${isActive ? "btn-primary" : ""}`}
    >
      {i + 1}
    </Link>
  );
}
export default Button;
