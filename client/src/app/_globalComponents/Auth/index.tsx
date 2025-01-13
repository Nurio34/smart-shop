"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Auth() {
  const { user } = useUser();

  return (
    <div className={`${!user ? "btn btn-primary btn-sm" : ""}`}>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default Auth;
