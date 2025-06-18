import { Pagination, Stack } from "@mui/material";

export function ProductPagination({
  count,
  page,
  onChange,
}: {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  return (
    <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
      />
    </Stack>
  );
}
