import SearchForBarbershops from "@/features/SearchForBarbershops";

interface SearchForBarbershopsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function SearchForBarbershopsPage({
  searchParams,
}: SearchForBarbershopsPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams.search ?? "";

  return <SearchForBarbershops searchTerm={searchTerm} />;
}
