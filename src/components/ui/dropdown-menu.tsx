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
  label?: string;
  subText?: string;
}

const SelectDemo: React.FC<SelectDemoProps> = ({
  options,
  loading,
  error,
  searchText,
  onInputChange,
  label,
  subText,
}) => {
  const [show, setShow] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(dropdownRef, () => setShow(false));

  return (
    <div className="relative w-full max-w-xs mx-auto" ref={dropdownRef}>
      {label ? <label htmlFor="name-input">{label}</label> : null}
      <Input
        id="name-input"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onFocus={() => setShow(true)}
        onChange={(e) => onInputChange(e.target.value.trim())}
        placeholder="Search for a name..."
        value={searchText}
      />
      <ul
        className={`absolute z-10 w-full bg-white mt-1 max-h-60 overflow-auto border border-gray-300 rounded-md shadow-lg transition-all ease-in-out duration-300 transform ${
          show
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
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
      {subText ? (
        <span className="text-sm text-gray-600">This is a subtext</span>
      ) : null}
    </div>
  );
};

export default memo(SelectDemo);
