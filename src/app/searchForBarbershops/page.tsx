import SearchForBarbershops from "@/features/SearchForBarbershops";

interface SearchForBarbershopsPageProps {
  searchParams: Promise<{ title?: string; service?: string }>;
}

export default async function SearchForBarbershopsPage({
  searchParams,
}: SearchForBarbershopsPageProps) {
  const resolvedSearchParams = await searchParams;
  const title = resolvedSearchParams.title;
  const service = resolvedSearchParams.service;

  return <SearchForBarbershops title={title} service={service} />;
}
