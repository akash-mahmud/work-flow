import { GetUserJobFlows } from "@/actions/jobflows/getJobFlowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitFor";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateJobFowDialogue from "./_components/CreateJobFowDialogue";

const WorkFlowsPage = () => {
  return (
    <div className=" flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className=" flex flex-col">
          <div className="text-3xl font-bold">Flows</div>
          <p className=" text-muted-foreground">Manage your flows</p>
        </div>
        <CreateJobFowDialogue  />
      </div>
      <div className=" h-full py-6 ">
        <Suspense fallback={<UserFlowsSkeleton />}>
          <UserFlows />
        </Suspense>
      </div>
    </div>
  );
};

function UserFlowsSkeleton() {
  return (
    <div className=" space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className=" w-full h-32" />
      ))}
    </div>
  );
}

async function UserFlows() {
  const jobflows = await GetUserJobFlows();
  if (!jobflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className=" w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
  if (jobflows.length === 0) {
    return (
      <div className=" flex flex-col gap-4 items-center justify-center ">
        <div className=" rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon className=" stroke-primary" />
        </div>
        <div className=" flex flex-col gap-1 text-center">
          <p className=" font-bold">No job flows</p>
          <p className=" text-sm text-muted-foreground">
            Click the button below to create your first job flow
          </p>
        </div>
        <CreateJobFowDialogue triggerText="Create your first jobflow" />
      </div>
    );
  }
  return <div></div>;
}

export default WorkFlowsPage;
