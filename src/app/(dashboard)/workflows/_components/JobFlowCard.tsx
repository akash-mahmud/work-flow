"use client";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { JobFlowStatus } from "@/types/joobflow";
import { Jobflow } from "@prisma/client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeleteJobFlowDialogue from "./DeleteJobFlowDialogue";
export const statusColors = {
  [JobFlowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [JobFlowStatus.PUBLISHED]: "bg-primary",
};
const JobFlowCard = ({ jobflow }: { jobflow: Jobflow }) => {
  const isDraft = jobflow.status === JobFlowStatus.DRAFT;
  return (
    <Card className=" border border-separate  shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 ">
      <CardContent className=" p-4 flex justify-between items-center h-[100px]">
        <div className=" flex justify-end space-x-3 items-center">
          <div
            className={cn(
              " w-10 h-10 flex rounded-full items-center justify-center  ",
              statusColors[jobflow.status as JobFlowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className=" h-5 w-5 text-white" />
            ) : (
              <PlayIcon className=" h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className=" text-base text-muted-foreground font-bold flex items-center">
              <Link
                href={`/workflow/editor/${jobflow.id}`}
                className=" flex items-center hover:underline"
              >
                {jobflow.name}
              </Link>
              {isDraft && (
                <span className=" ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className=" flex  space-x-2 items-center">
          <Link
            href={`/workflow/editor/${jobflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              " flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} /> Edit
          </Link>
          <JobFlowActions jobflowname={jobflow.name} jobFlowId={jobflow.id} />
        </div>
      </CardContent>
    </Card>
  );
};

function JobFlowActions({
  jobflowname,
  jobFlowId,
}: {
  jobflowname: string;
  jobFlowId: string;
}) {
  const [showDeleteDialogue, setshowDeleteDialogue] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} variant={"outline"}>
            <TooltipWrapper content={"More actions"} side={"top"}>
              <div className=" flex items-center h-full w-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className=" text-destructive flex items-center gap-2"
            onSelect={() => {
              setshowDeleteDialogue((prev) => !prev);
            }}
          >
            <Trash2Icon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteJobFlowDialogue
        jobFlowId={jobFlowId}
        jobFlowName={jobflowname}
        open={showDeleteDialogue}
        setOpen={setshowDeleteDialogue}
      />
    </>
  );
}
export default JobFlowCard;
