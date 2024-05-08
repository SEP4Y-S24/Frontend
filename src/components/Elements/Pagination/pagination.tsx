import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



interface Props{
  className: string;
    pages : number;
    page: number;
  onChange: any;
}
const PaginationRounded: React.FC<Props> = ({className, pages, page, onChange}) => {
  return (
    <Stack spacing={2}>
      <Pagination className={className} page={page} count={pages} onChange={onChange} variant="outlined" shape="rounded" color='primary'/>
    </Stack>
  );
}

export default PaginationRounded;
