import { TableProps } from "@/types/interface/dashboard";

const Table = <T extends { _id?: string }>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
}: TableProps<T>) => {
  return (
    <div className="bg-white dark:bg-navy/50 border border-black/0 dark:border-white/10 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-gray-100 dark:bg-navy">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 px-6 text-center text-black/60 dark:text-white/60"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row._id || index}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-black/10 dark:border-white/10 ${
                    onRowClick
                      ? "hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                      : ""
                  } transition-colors`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="py-4 px-6 text-black/70 dark:text-white/70"
                    >
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : String(row[column.key as keyof T] || "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
