import React, { Suspense } from "react";
import Search from "@/components/Updated/Search";

const SearchInfo = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
    </div>
  );
};

export default SearchInfo;