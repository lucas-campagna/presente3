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

export type DialogProps = {
  open: boolean;
  title: string;
  description: string;
  content?: React.ReactNode;
  action?: string | null;
  cancel?: string;
  onAction?: (_?: any) => void;
  onCancel?: () => void;
  onBlur?: (_: any) => void;
  initialState?: any;
};

function Dialog({
  open,
  title,
  description,
  action,
  content,
  cancel,
  onAction,
  onCancel,
  onBlur,
  initialState,
}: DialogProps) {
  const [state, setState] = useState<any>(initialState);
  useEffect(() => setState(initialState), [initialState]);
  const hasHeader = title || description;
  const hasFooter = action !== null || cancel;
  return (
    <DialogBase open={open}>
      <DialogContent onInteractOutside={onBlur}>
        {hasHeader && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {content}
        {/* {hasFooter && (
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
        )} */}
      </DialogContent>
    </DialogBase>
  );
}

export default Dialog;
