import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddToCartButton from "../../explore/_components/Products/AddToCartButton";

export const generateStaticParams = async () => {
  const sellers = await prisma.seller.findMany({
    where: { status: "APPROVED" },
  });
  return sellers.map((seller) => ({ userId: seller.userId }));
};

async function SellerPage({ params }: { params: Promise<{ userId: string }> }) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/home");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    select: {
      role: true,
    },
  });

  if (!user || user.role !== "USER") {
    redirect("/home");
  }

  const { userId } = await params;

  const seller = await prisma.seller.findUnique({
    where: { userId },
    include: {
      user: true,
      products: {
        include: {
          seller: true,
          thumbnail: true,
          images: true,
        },
      },
    },
  });

  if (!seller || seller.status !== "APPROVED") {
    redirect("/home");
  }

  return (
    <div className="seller-page px-4 lg:px-[10vw] py-8">
      {/* Seller Information */}
      <div className="seller-info mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center lg:text-left capitalize">
          {seller.brand}
        </h1>
        <p className="text-gray-700 mb-4 capitalize">{seller.description}</p>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-gray-600">
          <div>
            <p>
              <strong>Return Policy:</strong> {seller.returnPolicy}
            </p>
            <p>
              <strong>Minimum Order Quantity:</strong>{" "}
              {seller.minimumOrderQuantity}
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <h2 className="text-2xl font-semibold mb-6 ">Products</h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-[2vw] gap-y-[2vh] items-center ">
          {seller.products.map((product) => (
            <li
              key={product.id}
              className="overflow-hidden shadow-md p-[1vw] border rounded-md transition-all
                hover:shadow-md hover:border hover:border-primary hover:shadow-primary hover:scale-105
              "
            >
              <Link href={`/product/${product.id}`}>
                <h3 className="truncate font-semibold text-lg">
                  {product.title}
                </h3>
                <figure className=" w-full aspect-square relative">
                  <Image
                    src={product.thumbnail!.url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </figure>
                <p className=" truncate">{product.description}</p>
              </Link>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  by
                  <Link
                    href={`/seller/${product.sellerId}`}
                    className="btn btn-sm btn-link p-1 capitalize"
                  >
                    {product.seller.brand}
                  </Link>
                </div>
                <p>
                  $
                  {(
                    product.price *
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </p>
              </div>
              <AddToCartButton product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SellerPage;
