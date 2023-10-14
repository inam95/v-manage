"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";

interface MainNavProps extends React.ComponentProps<"nav"> {}

export default function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          {
            "text-primary": pathname === "/",
          }
        )}
      >
        Overview
      </Link>
      <Link
        href="/vehicles"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          {
            "text-primary": pathname === "/vehicles",
          }
        )}
      >
        Vehicles
      </Link>
      <Link
        href="/drivers"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          {
            "text-primary": pathname === "/drivers",
          }
        )}
      >
        Drivers
      </Link>
      {/* <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link> */}
    </nav>
  );
}
