import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";

function UserProfile({ user }: { user: User }) {
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

      {/* Activity Summary */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-lg font-medium">Order History</h3>
            <p className="text-2xl font-bold">15</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-lg font-medium">Wishlist Items</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-lg font-medium">Saved Items</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-lg font-medium">Reviews</h3>
            <p className="text-2xl font-bold">10</p>
          </div>
        </div>
      </section>

      {/* Editable Profile Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
      </section>

      {/* Notifications Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-4">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span>Order Updates</span>
          </label>
          <label className="flex items-center gap-4">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span>Promotional Emails</span>
          </label>
        </div>
      </section>

      {/* Security Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Reset Password
        </button>
      </section>

      {/* Account Deletion Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Account Management</h2>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
          Delete Account
        </button>
      </section>

      {/* Help and Support */}
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

export default UserProfile;
