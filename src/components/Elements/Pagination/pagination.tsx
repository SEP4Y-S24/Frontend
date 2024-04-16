import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props{
    pages : number;
}
export default function PaginationRounded({pages} : Props) {
  return (
    <Stack spacing={2}>
      <Pagination count={pages} variant="outlined" shape="rounded" color='primary'/>
    </Stack>
  );
}
