"use client";

import { getSearchedProducts } from "@/actions/getSearchedProducts";
import { useEffect, useState } from "react";
import SearchedProducts from "./SearchedProducts";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

export default function SearchClient() {
  const [searchedKey, setSearchedKey] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<ProductWithImages[]>(
    []
  );
  const [skip, setSkip] = useState(0);
  const [isScrollHitBottom, setIsScrollHitBottom] = useState(false);
  const [isAnyProductsLeftToFetch, setIsAnyProductsLeftToFetch] =
    useState(true);

  let timeout: NodeJS.Timeout;
  const getSearchedProductsAction = async () => {
    try {
      const products = await getSearchedProducts(searchedKey, skip);
      setSearchedProducts((pre) => [...pre, ...products]);
      setIsScrollHitBottom(false);

      if (products.length === 0) {
        setIsAnyProductsLeftToFetch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsAnyProductsLeftToFetch(true);
    setSkip(0);
    clearInterval(timeout);

    if (searchedKey.trim() !== "") {
      timeout = setTimeout(async () => {
        getSearchedProductsAction();
      }, 1100);
    } else {
      timeout = setTimeout(async () => {
        setSearchedProducts([]);
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [searchedKey]);

  useEffect(() => {
    if (skip > 0 && isAnyProductsLeftToFetch) {
      getSearchedProductsAction();
    }
  }, [skip, isAnyProductsLeftToFetch]);

  return (
    <>
      <form className=" w-full pr-[1vw] flex items-center gap-[1vw] border rounded-full overflow-hidden shadow-md">
        <input
          type="text"
          name="search"
          id="search"
          className="h-full w-full focus:outline-none py-3 pl-[2vw]"
          placeholder="Search product name ..."
          value={searchedKey}
          onChange={(e) => setSearchedKey(e.target.value)}
          autoComplete="off"
        />
        {searchedKey && (
          <button
            type="button"
            className="btn btn-sm btn-circle"
            onClick={() => setSearchedKey("")}
          >
            x
          </button>
        )}
      </form>
      <SearchedProducts
        searchedProducts={searchedProducts}
        setSearchedKey={setSearchedKey}
        setSkip={setSkip}
        isScrollHitBottom={isScrollHitBottom}
        setIsScrollHitBottom={setIsScrollHitBottom}
        isAnyProductsLeftToFetch={isAnyProductsLeftToFetch}
      />
    </>
  );
}
