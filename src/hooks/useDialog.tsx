import { DialogContext } from "@/contexts/DialogProvider";
import { useContext } from "react";

const useDialog = () => useContext(DialogContext);
export default useDialog;