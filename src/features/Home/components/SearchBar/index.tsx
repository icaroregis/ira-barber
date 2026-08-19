"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useSearchBarForm } from "./use-search-bar-form";
import { BarberTitleField } from "./fields/barber-title-field";
import { formSchema } from "./search-bar-form-schema";

interface SearchBarProps {
  variant?: "mobile" | "desktop";
  className?: string;
}

export default function SearchBar({
  variant = "mobile",
  className,
}: SearchBarProps) {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const form = useSearchBarForm();

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(
      `/searchForBarbershops?search=${encodeURIComponent(values.title)}`,
    );
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
