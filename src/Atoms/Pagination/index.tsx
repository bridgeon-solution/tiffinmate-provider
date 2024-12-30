import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationRoundedProps {
  totalPages: number; // Total number of pages for pagination
  onPageChange: (page: number) => void; // Function to handle page change
}

const PaginationRounded: React.FC<PaginationRoundedProps> = ({
  totalPages,
  onPageChange,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        onChange={(_, page) => onPageChange(page)}
      />
    </Stack>
  );
};

export default PaginationRounded;
