"use client";
import * as React from "react";
import { useOutsideAlerter } from "@/hooks";
import { Input } from "./input";
import { Separator } from "@radix-ui/react-select";

const DUMMY_API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

function debounce<F extends (...args: any[]) => void>(
  func: F,
  time: number = 500
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<F>) {
    // Clear any existing timeout to ensure only the last call is effective
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, time);

    // Provide a cancel function to clear the scheduled execution
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  };
}

export function SelectDemo() {
  const [show, setShow] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [loadingOptions, setLoadingOptions] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useOutsideAlerter(dropdownRef, () => setShow(false));

  const fetchData = React.useCallback(
    debounce(async (query = "") => {
      setLoadingOptions(true);
      // Adjust the API URL to fetch default options when query is empty
      const response = await fetch(`${DUMMY_API_ENDPOINT}?name_like=${query}`);
      const data = await response.json();
      setOptions(data.map((user: { name: string }) => user.name));
      setLoadingOptions(false);
    }),
    []
  );

  React.useEffect(() => {
    fetchData(searchText);
  }, [searchText, fetchData]);

  return (
    <div className="relative w-full max-w-xs mx-auto" ref={dropdownRef}>
      <Input
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onFocus={() => setShow(true)}
        onChange={(e) => setSearchText(e.target.value.trim())}
        placeholder="Search for a name..."
        value={searchText}
      />
      {show && (
        <ul className="absolute z-10 w-full bg-white mt-1 max-h-60 overflow-auto border border-gray-300 rounded-md shadow-lg">
          {options.length ? (
            options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer`}
                value={option}
                onClick={() => {
                  setSearchText(option);
                  setShow(false);
                }}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 ">No results found the query</li>
          )}
          {loadingOptions ? (
            <>
              <li className="sticky bottom-0 bg-inherit border border-t-gray-100 flex items-center justify-start gap-2 px-4 py-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#000111] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                </span>
                <span>Loading...</span>
              </li>
            </>
          ) : null}
        </ul>
      )}
    </div>
  );
}
