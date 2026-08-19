"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { formSchema, Values } from "./search-bar-form-schema";

export const useSearchBarForm = (): UseFormReturn<Values> => {
  return useForm<Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });
};
