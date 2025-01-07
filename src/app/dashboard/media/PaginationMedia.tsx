"use client";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  totalPages: number;
  currentPage: number;
};

export default function PaginationMedia({ totalPages, currentPage }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <div className="flex items-center justify-between p-2">
      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => {
              if (currentPage === 1) return;
              const params = new URLSearchParams(searchParams);
              params.set("page", (currentPage + 1).toString());
              replace(`${pathname}?${params.toString()}`);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => {
              if (currentPage === totalPages) return;
              const params = new URLSearchParams(searchParams);
              params.set("page", (currentPage + 1).toString());
              replace(`${pathname}?${params.toString()}`);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
}
