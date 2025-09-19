import Dialog, { type DialogProps } from "@/components/Dialog";
import React, { createContext, useState } from "react";

const defaultDialog = {
  open: (_: Partial<DialogProps>) => {},
  close: () => {},
};
export const DialogContext = createContext(defaultDialog);

function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogProps, setDialogProps] = useState<Partial<DialogProps>>();

  function close() {
    setDialogProps({ open: false });
  }
  function handleCancel() {
    close();
    dialogProps?.onCancel?.();
  }
  function handleAction(state: any) {
    close();
    dialogProps?.onAction?.(state);
  }

  return (
    <DialogContext.Provider
      value={{
        open: (e) => setDialogProps({ open: true, ...e }),
        close,
      }}
    >
      {dialogProps && (
        <Dialog
          {...(dialogProps as React.ComponentProps<typeof Dialog>)}
          onCancel={handleCancel}
          onAction={handleAction}
          onBlur={close}
        />
      )}
      {children}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
