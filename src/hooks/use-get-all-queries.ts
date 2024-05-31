"use client";

import { CategoryService } from "@/actions/category/category-service";
import { InstructorService } from "@/actions/instructor/instructor-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllQueries = () => {
  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: CategoryService.getAll,
  });

  const { data: instructors } = useQuery({
    queryKey: ["all-instructors"],
    queryFn: InstructorService.getAll,
  });

  return {
    categories,
    instructors,
  }
};
