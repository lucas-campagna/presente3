import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type BaseDialogProps = {
  title: string;
  children: React.ReactNode;
  content?: React.ReactNode;
  description?: string;
  cancel?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function BaseDialog({
  children,
  description,
  cancel,
  footer,
  content,
  title,
}: BaseDialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {content}
          {(footer || cancel) && (
            <DialogFooter>
              {cancel && <DialogClose asChild>{cancel}</DialogClose>}
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
