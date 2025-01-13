"use client";
import { useEffect, useState } from "react";
import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export const dynamic = "force-dynamic";

export default function AllProduct() {
  const [allAdminProducts, setAllAdminProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await getAllAdminProducts();
      if (res) {
        setAllAdminProducts(res.data);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <CommonListing data={allAdminProducts} />
    </div>
  );
}