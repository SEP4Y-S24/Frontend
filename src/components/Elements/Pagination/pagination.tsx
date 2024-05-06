import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props{
  className: string;
    pages : number;
}
const PaginationRounded: React.FC<Props> = ({className, pages}) => {
  return (
    <Stack spacing={2}>
      <Pagination className={className} count={pages} variant="outlined" shape="rounded" color='primary'/>
    </Stack>
  );
}

export default PaginationRounded;