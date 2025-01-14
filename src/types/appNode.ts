import { Node } from "reactflow";
import { TaskType } from "./task";
export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}
export interface AppNodes extends Node {
  data: AppNodeData;
}
