import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, UIEvent, useEffect } from "react";
import { Dispatch } from "react";

function SearchedProducts({
  searchedProducts,
  setSearchedKey,
  setSkip,
  isScrollHitBottom,
  setIsScrollHitBottom,
  isAnyProductsLeftToFetch,
}: {
  searchedProducts: ProductWithImages[];
  setSearchedKey: Dispatch<SetStateAction<string>>;
  setSkip: Dispatch<SetStateAction<number>>;
  isScrollHitBottom: boolean;
  setIsScrollHitBottom: Dispatch<SetStateAction<boolean>>;
  isAnyProductsLeftToFetch: boolean;
}) {
  const handleScroll = (e: UIEvent<HTMLUListElement>) => {
    const target = e.currentTarget;

    const { scrollTop, scrollHeight, clientHeight } = target;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setIsScrollHitBottom(true);
      setSkip((pre) => pre + 5);
    }
  };

  useEffect(() => {
    if (searchedProducts.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [searchedProducts]);

  return (
    <AnimatePresence>
      {searchedProducts.length > 0 && (
        <motion.ul
          className=" absolute z-10 md:min-w-96 max-w-full max-h-[420px] py-[1vh] px-[1vw] bg-base-content rounded-lg overflow-y-auto
              grid gap-y-[1vh] border-2 border-secondary shadow-md shadow-secondary
            "
          style={{
            scrollbarWidth: "thin",
          }}
          onScroll={handleScroll}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          {searchedProducts.map((product) => (
            <li key={product.id}>
              <Link
                href={`/product/${product.id}`}
                className="grid grid-cols-[auto,1fr] bg-base-100 rounded-md pr-[0.5vw]"
                onClick={() => setSearchedKey("")}
              >
                <figure className=" relative w-20 aspect-square">
                  <Image
                    src={product.thumbnail!.url}
                    alt={product.title}
                    fill
                  />
                </figure>
                <div>
                  <h2 className=" text-lg font-bold">{product.title}</h2>
                  <p className="h-6 overflow-hidden overflow-ellipsis">
                    {product.description}
                  </p>
                  <p className=" text-sm font-semibold justify-self-end">
                    ${product.price}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          {isScrollHitBottom && isAnyProductsLeftToFetch && (
            <div className=" flex justify-center items-center gap-x-[1vw]  text-base-100">
              <p className="">Fetching more products...</p>
              <span className="loading loading-infinity loading-lg "></span>
            </div>
          )}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
export default SearchedProducts;
