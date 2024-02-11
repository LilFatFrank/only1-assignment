"use client";
import { SelectDemo } from "@/components";
import { debounce } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

const DUMMY_API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export default function Home() {
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    debounce(async (query = "") => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${DUMMY_API_ENDPOINT}?name_like=${query}`
        );
        const data = await response.json();
        setOptions(data.map((user: { name: string }) => user.name));
        setError(data.length ? "" : "No results found for this query!");
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(searchText);
  }, [searchText, fetchData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SelectDemo
        options={options}
        error={error}
        loading={loading}
        onInputChange={(val) => setSearchText(val)}
        searchText={searchText}
        label="Enter Name"
        subText="This is an assignment for Only1"
      />
    </main>
  );
}
