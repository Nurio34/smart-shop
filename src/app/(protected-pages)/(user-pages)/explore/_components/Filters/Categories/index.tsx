import { prisma } from "@/lib/prisma";

async function Categories() {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  const categoryNames = categories.map((cat) => cat.category);
  return (
    <select
      className="grow select select-bordered py-[1vh] px-[1vw]"
      name="category"
    >
      <option value="">Categories</option>
      {categoryNames.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default Categories;
