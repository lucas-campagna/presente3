import {
  Dialog as DialogBase,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function Dialog({
  open,
  title,
  description,
  action,
  inputs,
  cancel,
  onAction,
  onCancel,
  onBlur,
  initialState,
}: {
  open: boolean;
  title: string;
  description: string;
  inputs?: (props: {
    state: any;
    setState: React.Dispatch<any>;
  }) => React.ReactNode;
  action?: string | null;
  cancel?: string;
  onAction?: (_?: any) => void;
  onCancel?: () => void;
  onBlur?: (_: any) => void;
  initialState?: any;
}) {
  const [state, setState] = useState<any>(initialState);
  useEffect(() => setState(initialState), [initialState]);
  const hasHeader = title || description;
  const hasFooter = action !== null || cancel;
  return (
    <DialogBase open={open}>
      <DialogContent onInteractOutside={onBlur}>
        <DialogHeader className={hasHeader ? "" : "hidden"}>
          <DialogTitle className={title ? undefined : "hidden"}>
            {title}
          </DialogTitle>
          <DialogDescription className={description ? undefined : "hidden"}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {initialState && state && inputs?.({ state, setState })}
        {hasFooter && (
          <DialogFooter>
            {action !== null && (
              <Button onClick={() => onAction?.(state)}>
                {action ?? "Ok"}
              </Button>
            )}
            {cancel && (
              <Button variant={"outline"} onClick={onCancel}>
                {cancel}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogBase>
  );
}

export default Dialog;