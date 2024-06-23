'use client'

import { Pagination as Paginator, PaginationItem } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation';

interface IProps {
  total: number
  prevParams?: string
}

function Pagination({ total, prevParams = '' }: IProps) {
  const navigate = useRouter();
  const search = useSearchParams();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Paginator
        count={total}
        page={Number(search?.get('page') ?? 1)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            onClick={() => navigate.push(`?page=${item?.page}&${prevParams}`)}
          />
        )}
      />
    </div>
  )
}

export default Pagination
