/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR CONTEXT
   Chia sẻ trạng thái sidebar (collapsed / mobileOpen) giữa
   HeaderAdmin và AdminLayout để đồng bộ margin content.
   ═══════════════════════════════════════════════════════════════ */

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar phải dùng bên trong <SidebarProvider>");
  return ctx;
}

export { useSidebar };
