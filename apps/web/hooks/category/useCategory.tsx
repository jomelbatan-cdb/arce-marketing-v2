import { useApiClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import { useState, useEffect } from "react";

export const useCategories = () => {
  const api = useApiClient();
  const fetchCategories = async (): Promise<Category[]> => {
    const res = await api.get("/category");
    return res.data;
  };
  const [resolvedData, setResolvedData] = useState<Category[] | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setResolvedData(data);
    }
  }, [data, isLoading, isError]);

  // hook returns ONLY final usable data
  return resolvedData;
};
