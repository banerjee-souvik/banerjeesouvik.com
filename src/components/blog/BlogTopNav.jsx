"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BlogThemeToggle from "./BlogThemeToggle";

export default function BlogTopNav() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <div className="blogTopNavWrap">
      <nav className="blogTopNav" aria-label="Blog navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "isActive" : ""}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="blogThemeToggle">
        <BlogThemeToggle />
      </div>
    </div>
  );
}
