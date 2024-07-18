import { DataGrid } from "@mui/x-data-grid";

export default function TableSection({ rows, columns }) {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
