import { createContext, useContext, useState, useCallback } from "react";

const AuthModalContext = createContext(null);

/**
 * Provides global auth-modal state.
 * modalType: "login" | "register" | "forget_password"
 */
export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login");

  const openLogin = useCallback(() => {
    setModalType("login");
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setModalType("register");
    setIsOpen(true);
  }, []);

  const openForgetPassword = useCallback(() => {
    setModalType("forget_password");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        modalType,
        openLogin,
        openRegister,
        openForgetPassword,
        closeModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
