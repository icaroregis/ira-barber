import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Control } from "react-hook-form";
import { Values } from "../search-bar-form-schema";

export const BarberTitleField = ({
  variant,
  control,
}: {
  variant: "mobile" | "desktop";
  control: Control<Values>;
}) => {
  const inputClass =
    variant === "mobile"
      ? "h-9 border-[#26272B] bg-[#1A1B1F] text-sm placeholder:text-[#838896]"
      : "h-11 border-none bg-[#26272B] text-base text-white placeholder:text-[#838896]";
  const buttonClass =
    variant === "mobile"
      ? "bg-primary hover:bg-primary/90 h-9 w-9 rounded-lg"
      : "bg-primary hover:bg-primary/90 h-11 w-11 shrink-0 rounded-lg";
  const placeholder = variant === "mobile" ? "Buscar" : "Buscar Barbearias";

  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem className="relative w-full space-y-0">
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                className={inputClass}
              />
            </FormControl>
            <FormMessage className="absolute top-full left-0 mt-1 text-xs" />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        size="icon"
        className={buttonClass}
        aria-label="Buscar"
      >
        <SearchIcon size={20} />
      </Button>
    </>
  );
};
