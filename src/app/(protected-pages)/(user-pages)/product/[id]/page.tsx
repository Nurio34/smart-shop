import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PageContainer from "./PageContainer";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      thumbnail: true,
    },
  });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }

  return {
    title: product.title,
    description: product.description || "Buy this amazing product now!",
    openGraph: {
      title: product.title,
      description: product.description || "Buy this amazing product now!",
      images: product.thumbnail ? [{ url: product.thumbnail.url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description || "Buy this amazing product now!",
      images: product.thumbnail ? [{ url: product.thumbnail.url }] : [],
    },
  };
}

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user || user.role !== "USER") {
    return redirect("/home");
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      thumbnail: true,
      reviews: {
        include: {
          reviewer: true,
        },
      },
    },
  });

  if (!product) {
    return redirect("/home");
  }

  //! *** save product to history ***
  await prisma.user.update({
    where: { clerkId },
    data: {
      history: {
        connect: { id: product.id }, // Connect the product to the user's history
      },
    },
  });

  return <PageContainer product={product} />;
}

export default ProductPage;
