"use client";
import React, { useState, useRef, memo } from "react";
import { Input } from "./input";
import { useOutsideAlerter } from "@/hooks";

interface SelectDemoProps {
  options: string[];
  loading: boolean;
  error: string;
  searchText: string;
  onInputChange: (val: string) => void;
}

const SelectDemo: React.FC<SelectDemoProps> = ({
  options,
  loading,
  error,
  searchText,
  onInputChange,
}) => {
  const [show, setShow] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(dropdownRef, () => setShow(false));

  return (
    <div className="relative w-full max-w-xs mx-auto" ref={dropdownRef}>
      <Input
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onFocus={() => setShow(true)}
        onChange={(e) => onInputChange(e.target.value.trim())}
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
                  onInputChange(option);
                  setShow(false);
                }}
              >
                {option}
              </li>
            ))
          ) : error ? (
            <li className="px-4 py-2 ">{error}</li>
          ) : null}
          {loading ? (
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
};

export default memo(SelectDemo);
