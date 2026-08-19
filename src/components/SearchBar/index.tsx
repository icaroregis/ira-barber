"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { formSchema } from "./search-bar-form-schema";
import { useSearchBarForm } from "./use-search-bar-form";
import { useRouter, useSearchParams } from "next/navigation";
import { BarberTitleField } from "./fields/barber-title-field";

interface SearchBarProps {
  variant?: "mobile" | "desktop";
  className?: string;
}

export default function SearchBar({
  variant = "mobile",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const form = useSearchBarForm();
  const searchParams = useSearchParams();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", values.title);
    router.push(`/searchForBarbershops?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className ?? "flex items-center gap-2"}
      >
        <BarberTitleField variant={variant} />
      </form>
    </Form>
  );
}
