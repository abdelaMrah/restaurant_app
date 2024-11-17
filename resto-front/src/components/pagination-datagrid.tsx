"use client"

import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useQueries } from 'react-query';
import { useMemo, useState } from 'react';
import { hexToRgba } from '../utils/utils';
import { useTheme } from '@mui/material';


interface ServerSideDataGridProps<T> {
  columns: GridColDef[];
  fetchData: (options: FetchDataOptions) => Promise<FetchDataResult<T>>;
  initialPageSize?: number;
}

export interface FetchDataOptions {
  page: number;
  pageSize: number;
  sort?: GridSortModel;
  filter?: GridFilterModel;
}

export interface FetchDataResult<T> {
  rows: T[];
  totalRowCount: number;
}

 
function ServerSideDataGrid<T extends { id: string | number }>({
  columns,
  fetchData,
  initialPageSize = 10,
}: ServerSideDataGridProps<T>) {
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: initialPageSize,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });
const {palette} = useTheme()
  const queryOptions = useMemo(
    () => ({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sort: sortModel,
      filter: filterModel,
    }),
    [paginationModel, sortModel, filterModel]
  );


  const [{data,isLoading} ] = useQueries([
    {queryKey:['gridData', queryOptions],queryFn:async() =>await fetchData(queryOptions),}
  ])
  console.log({data})
 
  const [rowCountState, setRowCountState] = useState(data?.totalRowCount || 0);

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.totalRowCount !== undefined ? data.totalRowCount : prevRowCountState,
    );
  }, [data?.totalRowCount, setRowCountState]);

  const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const handleSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  };

  const handleFilterModelChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
   
      <div style={{ height:'100%', width: '100%' }}>
        <DataGrid
          rows={data?.rows||[]}
          columns={columns}
          rowCount={rowCountState}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          onPaginationModelChange={handlePaginationModelChange}
          onSortModelChange={handleSortModelChange}
          onFilterModelChange={handleFilterModelChange}
          slots={{
            toolbar:GridToolbar
          }}
          slotProps={{
            toolbar:{
                showQuickFilter: true,
                quickFilterProps:{debounceMs:500}
            }
          }}
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              padding: '8px',
              backgroundColor: hexToRgba(palette.primary.light,0.3),
            },
            '& .MuiButton-root': {
              color: 'primary.main',
            },
          }}
        />
      </div>
    </div>
  );
}

export default ServerSideDataGrid;