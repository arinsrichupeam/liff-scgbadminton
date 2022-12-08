import { useSession } from "next-auth/react";
import React from "react";
import Logo from "../components/logo";

export default function checkin() {
  const { data: session } = useSession();
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="flex items-center justify-center">
            <Logo></Logo>
          </div>
          <h2 className="mt-6 text-center text-5xl font-SCGBold tracking-tight text-gray-900">
            แบบสอบถาม
          </h2>
          <p>{session?.user?.name}</p>
        </div>
        <form action="/api/users" method="post"></form>
      </div>
    </div>
  );
}
