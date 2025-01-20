import React from "react";
import Image from "next/image";
import { UserWithSeller } from "@/types/user";

function SellerProfile({ user }: { user: UserWithSeller }) {
  const { seller } = user;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <header className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <Image
            src={user.avatar!}
            alt={user.name!}
            className="rounded-full"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Brand Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Brand Overview</h2>
        <div className="p-6 bg-gray-100 rounded-lg space-y-4">
          <h3 className="text-lg font-medium">Brand Name</h3>
          <p>{seller!.brand}</p>

          <h3 className="text-lg font-medium">Description</h3>
          <p>{seller!.description}</p>

          <h3 className="text-lg font-medium">Return Policy</h3>
          <p>{seller!.returnPolicy}</p>

          <h3 className="text-lg font-medium">Minimum Order Quantity</h3>
          <p>{seller!.minimumOrderQuantity}</p>
        </div>
      </section>

      {/* Seller Status */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Seller Status</h2>
        <div
          className={`p-4 rounded-lg ${
            seller!.status === "APPROVED"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          <p className="text-lg font-medium">Status: {seller!.status}</p>
          <p>
            {seller!.status === "PENDING"
              ? "Your application is under review."
              : "Your account is active."}
          </p>
        </div>
      </section>

      {/* Editable Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
      </section>

      {/* Support Section */}
      <footer className="text-center">
        <p className="text-sm text-gray-500">
          Need help?{" "}
          <a href="/support" className="text-blue-500 hover:underline">
            Contact Support
          </a>
        </p>
      </footer>
    </div>
  );
}

export default SellerProfile;
