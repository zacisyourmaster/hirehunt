import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

// dont need anymore
// async function AuthSection() {
//   const user = await currentUser();

//   return user ? (
//     <div className="flex items-center space-x-4">
//       <Link
//         href="/dashboard"
//         className="px-3 py-2 rounded-md text-sm font-medium text-primary"
//       >
//         <Button variant="ghost" className="text-primary hover:text-foreground">
//           Dashboard
//         </Button>
//       </Link>
//       <span className="text-sm text-primary hidden md:inline">
//         Hello, {user.firstName || user.username}
//       </span>
//       <UserButton />
//     </div>
//   ) : (
//     <SignInButton mode="modal">
//       <Button
//         variant="ghost"
//         className="text-muted-foreground hover:text-primary cursor-pointer"
//       >
//         Log In
//       </Button>
//     </SignInButton>
//   );
// }

// Main Navbar component
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
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="px-3 py-2 rounded-md text-sm font-medium"
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
