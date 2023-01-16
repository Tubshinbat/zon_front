"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Head({ params }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("categories");

  return (
    <>
      <title>
        {(category && category + " | мэдээ мэдээлэл") || "Мэдээ мэдээлэл"}
      </title>
    </>
  );
}
