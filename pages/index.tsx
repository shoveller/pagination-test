import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

type Data = {
  results: {
    name: string;
    url: string;
  }[];
};

export default function Home() {
  const router = useRouter();
  const offset = router.query.offset || "0";
  const { isLoading, data } = useQuery({
    queryKey: [offset],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
        .then<Data>((res) => res.json())
        .then((data) => data.results),
  });

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <ul>
      {data?.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
      <button
        onClick={() => router.push({ query: { offset: Number(offset) - 10 } })}
      >
        이전
      </button>
      <button
        onClick={() => router.push({ query: { offset: Number(offset) + 10 } })}
      >
        다음
      </button>
    </ul>
  );
}
