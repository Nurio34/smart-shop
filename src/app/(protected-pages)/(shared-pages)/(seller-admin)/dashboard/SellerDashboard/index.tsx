import { prisma } from "@/lib/prisma";
import { UserWithSellerAndProducts } from "@/types/user";
import RevenueChart from "./RevenueChart";
import Image from "next/image";

// Dynamically import ApexCharts for the chart

async function SellerDashboard({ user }: { user: UserWithSellerAndProducts }) {
  const products = user.seller?.products || [];

  // Fetch orders and calculate revenue on the server
  const orders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          product: {
            sellerId: user.clerkId,
          },
        },
      },
    },
    include: { items: true },
  });

  const revenue = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (orderSum, item) => orderSum + item.price * item.quantity,
        0
      ),
    0
  );

  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i).toLocaleString("default", { month: "short" }),
    revenue: orders
      .filter(
        (order) =>
          new Date(order.createdAt).getMonth() === i &&
          new Date(order.createdAt).getFullYear() === 2025
      )
      .reduce(
        (sum, order) =>
          sum +
          order.items.reduce(
            (orderSum, item) => orderSum + item.price * item.quantity,
            0
          ),
        0
      ),
  }));

  return (
    <div className="dashboard-container px-4 lg:px-20 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Seller Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-primary text-primary-content shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Total Products</h2>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Total Orders</h2>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
        </div>
        <div className="card bg-accent text-accent-content shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Total Revenue</h2>
            <p className="text-2xl font-bold">${revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <RevenueChart monthlyRevenue={monthlyRevenue} />

      {/* Product List */}
      <h2 className=" text-2xl font-bold pb-2">Products</h2>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300,1fr))] gap-x-[2vw] gap-y-[2vh] items-center ">
        {products.map((product) => (
          <li
            key={product.id}
            className="overflow-hidden shadow-md p-[1vw] border rounded-md transition-all
           "
          >
            <div>
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
              <p>{product.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm pl-2">
                Brand :{" "}
                <span className=" text-primary underline underline-offset-2 font-semibold">
                  {product.brand}
                </span>
              </div>
              <p>
                $
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellerDashboard;
