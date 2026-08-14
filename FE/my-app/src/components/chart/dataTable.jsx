

export default function DataTable({ title, columns, data }) {
  return (
    <div className="rounded-[18px] border border-[#e0e0e0] bg-[#ffffff] shadow-sm overflow-hidden">
      <div className="border-b border-[#e0e0e0] px-6 py-4 flex justify-between items-center bg-[#f5f5f7]">
        <h3
          className="text-[17px] font-semibold text-[#1d1d1f]"
          style={{
            fontFamily: "SF Pro Text, system-ui, sans-serif",
            letterSpacing: "-0.374px",
          }}
        >
          {title}
        </h3>
        <button
          className="text-[14px] font-medium text-[#0066cc] hover:text-[#0071e3]"
          style={{ fontFamily: "SF Pro Text, system-ui, sans-serif" }}
        >
          View all
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e0e0e0] bg-[#fafafc]">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-[12px] font-semibold tracking-wider text-[#7a7a7a] uppercase"
                  style={{ fontFamily: "SF Pro Text, system-ui, sans-serif" }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0] bg-white">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-[#fafafc] transition-colors">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="whitespace-nowrap px-6 py-4 text-[14px] text-[#1d1d1f]"
                    style={{
                      fontFamily: "SF Pro Text, system-ui, sans-serif",
                      letterSpacing: "-0.224px",
                    }}
                  >
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-[#7a7a7a] text-[14px]">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
