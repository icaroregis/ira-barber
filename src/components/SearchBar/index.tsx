"use client";

import { Suspense } from "react";
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

function SearchBarContent({ variant = "mobile", className }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get("title") ?? "";
  const form = useSearchBarForm(initialTitle);

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(
      `/searchForBarbershops?title=${encodeURIComponent(values.title)}`,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className ?? "flex items-center gap-2"}
      >
        <BarberTitleField variant={variant} control={form.control} />
      </form>
    </Form>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense fallback={<div>Carregando busca...</div>}>
      <SearchBarContent {...props} />
    </Suspense>
  );
}
