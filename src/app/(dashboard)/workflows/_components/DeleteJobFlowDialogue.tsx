"use client";

import { DeleteJobFlow } from "@/actions/jobflows/deleteJobflow";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  jobFlowName: string;
  jobFlowId: string;
}
const DeleteJobFlowDialogue = ({
  open,
  setOpen,
  jobFlowName,
  jobFlowId,
}: Props) => {
  const [confirmText, setconfirmText] = useState("");
  const DeletMutation = useMutation({
    mutationFn: DeleteJobFlow,
    onSuccess: () => {
      toast.success("Jobflow deleted successfully", {
        id: jobFlowId,
      });
      setconfirmText("");
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: jobFlowId,
      });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertTitle>Are you absoulately sure?</AlertTitle>
          <AlertDescription>
            If you delete this jobflow you will not be able to recover it.
            <div className=" flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{jobFlowName}</b> to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setconfirmText(e.target.value)}
              />
            </div>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setconfirmText("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={jobFlowName !== confirmText || DeletMutation.isPending}
            onClick={() => {
              toast.loading("Deleteing jobflow...", { id: jobFlowId });
              DeletMutation.mutate(jobFlowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobFlowDialogue;
