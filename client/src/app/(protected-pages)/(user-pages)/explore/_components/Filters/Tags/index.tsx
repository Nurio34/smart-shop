import { prisma } from "@/lib/prisma";

async function Tags() {
  const products = await prisma.product.findMany({
    select: { tags: true },
  });

  const uniqueTags = Array.from(
    new Set(products.flatMap((product) => product.tags))
  );

  return (
    <div className="grow">
      <input
        name="tag"
        list="tags-list"
        type="text"
        placeholder="Search tags"
        className="input input-sm md:input-md input-bordered w-full"
      />
      <datalist id="tags-list">
        {uniqueTags.map((tag) => (
          <option key={tag} value={tag} />
        ))}
      </datalist>
    </div>
  );
}

export default Tags;
