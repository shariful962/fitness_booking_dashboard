import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginations = ({
  totalItems,
  currentPage,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div className=" flex items-center justify-between px-4">
      {/* Showing Text */}
      <div className="text-lg text-[#2C5945]">
        SHOWING {startIndex + 1}–{Math.min(endIndex, totalItems)} OF{" "}
        {totalItems}
      </div>

      {/* Pagination */}
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          shape="rounded"
          siblingCount={0}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#727272",
            },
            "& .Mui-selected": {
              backgroundColor: "#2C5945 !important",
              color: "white",
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default Paginations;