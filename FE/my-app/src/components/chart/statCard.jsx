

export default function StatCard({ title, value, change, changeType, icon: Icon }) {
  return (
    <div className="rounded-[18px] border border-[#e0e0e0] bg-[#ffffff] p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-[14px] font-medium text-[#7a7a7a]"
            style={{
              fontFamily: "SF Pro Text, system-ui, sans-serif",
              letterSpacing: "-0.224px",
            }}
          >
            {title}
          </p>
          <h3
            className="mt-2 text-[34px] font-semibold text-[#1d1d1f]"
            style={{
              fontFamily: "SF Pro Text, system-ui, sans-serif",
              lineHeight: 1.47,
              letterSpacing: "-0.374px",
            }}
          >
            {value}
          </h3>
        </div>
        <div className="rounded-full bg-[#f5f5f7] p-3 text-[#1d1d1f]">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center text-[14px]">
          <span
            className={`font-medium ${
              changeType === "increase" ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeType === "increase" ? "+" : "-"}{change}
          </span>
          <span className="ml-2 text-[#7a7a7a]">vs last month</span>
        </div>
      )}
    </div>
  );
}
