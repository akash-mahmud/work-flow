"use client";
import CustomDialogueHeader from "@/components/CustomDialogueHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createJobFlowSchema, createJobFlowSchemaType } from "@/schema/jobflow";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateJobFlow } from "@/actions/jobflows/createJobFlows";
import { toast } from "sonner";
const CreateJobFowDialogue = ({ triggerText }: { triggerText?: string }) => {
  const [open, setopen] = useState(false);
  const form = useForm<createJobFlowSchemaType>({
    resolver: zodResolver(createJobFlowSchema),
  });
  const { isPending, mutate } = useMutation({
    mutationFn: CreateJobFlow,
    onSuccess: () => {
      toast.success("Jobflow created", { id: "create-jobflow" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "create-jobflow" });
    },
  });
  const onSubmit = useCallback(
    (values: createJobFlowSchemaType) => {
      toast.loading("Creating jobflow...", { id: "create-jobflow" });
      mutate(values);
    },
    [mutate]
  );
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setopen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create jobflow"}</Button>
      </DialogTrigger>
      <DialogContent className=" px-0">
        <CustomDialogueHeader
          icon={Layers2Icon}
          title={"Create jobflow"}
          subTitle={"Start building your jobflow"}
        />
        <div className=" p-6">
          <Form {...form}>
            <form
              className=" w-ful space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <p className=" text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                      <p className=" text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className=" resize-none" />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description about what your brief does.{" "}
                      This is optional but can be helpful for you to remeber
                      what this flow does.
                    </FormDescription>
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit" className=" w-full" disabled={isPending}>
                {!isPending && "Proceed"}
                {isPending && <Loader2 className=" animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobFowDialogue;
