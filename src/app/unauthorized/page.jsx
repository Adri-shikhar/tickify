"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiLock } from "react-icons/fi";

export default function UnauthorizedPage() {
  const router = useRouter();

  function handleGoBack() {
    router.push("/");
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        
        {/* Warning Lock Icon from React Icons */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FiLock className="h-8 w-8" />
        </div>

        {/* Text Messages */}
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          Access Denied
        </h1>
        
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          You do not have the necessary permissions to view this page. This area is restricted to authorized accounts only.
        </p>

        {/* Action Button */}
        <div className="mt-8">
          <Button
            onClick={handleGoBack}
            className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md transition-all hover:opacity-90"
          >
            Go Back Home
          </Button>
        </div>
        
      </div>
    </div>
  );
}