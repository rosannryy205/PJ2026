import React, { useMemo } from "react";

const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

function ruleState({ label, satisfied }) {
  return (
    <li className="flex items-start gap-2">
      <span
        className={[
          "mt-[2px] shrink-0 w-[14px] h-[14px] rounded-full",
          satisfied ? "bg-[#0066cc]" : "bg-[#e0e0e0]",
        ].join(" ")}
        aria-hidden="true"
      />
      <span
        className={[
          "text-[14px] tracking-[-0.224px] leading-[1.29]",
          satisfied ? "text-[#1d1d1f]" : "text-[#7a7a7a]",
        ].join(" ")}
      >
        {label}
      </span>
    </li>
  );
}

export default function PasswordStrengthHints({ password = "" }) {
  const rules = useMemo(() => {
    const value = password || "";
    const hasMinLen = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[^A-Za-z0-9]/.test(value);

    // Only validate based on the above rules (client-side only)
    const satisfiedCount = [hasMinLen, hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean)
      .length;

    let variant = "info";
    if (value.length === 0) variant = "info";
    else if (satisfiedCount >= 4) variant = "success";
    else if (satisfiedCount <= 2) variant = "error";

    return {
      hasMinLen,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      satisfiedCount,
      variant,
    };
  }, [password]);

  return (
    <div
      className="w-full mt-3"
      style={{ fontFamily: SF_TEXT }}
      aria-live="polite"
    >
      <div className="text-[12px] font-semibold tracking-[0.5px] uppercase text-[#1d1d1f] mb-2 pl-1">
        Password rules
      </div>
      <ul className="flex flex-col gap-2">
        {ruleState({ label: "At least 8 characters", satisfied: rules.hasMinLen })}
        {ruleState({ label: "Include uppercase letter", satisfied: rules.hasUpper })}
        {ruleState({ label: "Include lowercase letter", satisfied: rules.hasLower })}
        {ruleState({ label: "Include a number", satisfied: rules.hasNumber })}
        {ruleState({ label: "Include a symbol", satisfied: rules.hasSymbol })}
      </ul>
    </div>
  );
}

