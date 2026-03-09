import { create } from "zustand";

export const usePaymentStore = create((set) => ({
  showSuccess: false,
  setShowSuccess: (value) => set({ showSuccess: value }),
  paymentResult: null,
  setPaymentResult: (value) => set({ paymentResult: value }),
  paymentFailed: false,
  setPaymentFailed: (value) => set({ paymentFailed: value }),
  failureMessage: "",
  setFailureMessage: (value) => set({ failureMessage: value }),
}));
