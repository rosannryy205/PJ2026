

// Mock Bar Chart component using Tailwind CSS
export default function BarChart({ title, data, height = "250px" }) {
  // Find max value for scaling
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="rounded-[18px] border border-[#e0e0e0] bg-[#ffffff] shadow-sm p-6 flex flex-col h-full">
      <h3
        className="mb-6 text-[17px] font-semibold text-[#1d1d1f]"
        style={{
          fontFamily: "SF Pro Text, system-ui, sans-serif",
          letterSpacing: "-0.374px",
        }}
      >
        {title}
      </h3>
      
      <div className="flex-1 flex items-end space-x-2 sm:space-x-4 min-h-50" style={{ height }}>
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          return (
            <div key={index} className="group relative flex-1 flex flex-col items-center justify-end h-full">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-[12px] py-1 px-2 rounded-md transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {item.label}: {item.value}
              </div>
              
              {/* Bar */}
              <div 
                className="w-full bg-[#0066cc] rounded-t-sm transition-all duration-500 ease-in-out group-hover:bg-[#0071e3]"
                style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
              ></div>
              
              {/* Label */}
              <span className="mt-2 text-[12px] text-[#7a7a7a] truncate max-w-full" title={item.label}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
