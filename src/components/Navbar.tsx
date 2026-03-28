import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <Briefcase />
          HireHunt
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<Skeleton className="h-10 w-20" />}>
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="  hover:bg-muted-foreground px-3 py-2 rounded-md font-medium text-md transition-all duration-200 cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
