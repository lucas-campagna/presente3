import Dialog from "@/components/dialog";
import React, { createContext, useState } from "react";

type PartialDialogProps = Partial<React.ComponentProps<typeof Dialog>>;
const defaultDialog = {
  open: (_?: PartialDialogProps) => {},
  close: () => {},
};
export const DialogContext = createContext(defaultDialog);

function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogProps, setDialogProps] = useState<PartialDialogProps>();

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