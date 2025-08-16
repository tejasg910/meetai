import { inferRouterOutputs } from "@trpc/server";


import type { AppRouter } from "@/trpc/routers/_app";
export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
export enum MeetingStatus {
    upcomming = "upcomming",
    active = "active",
    completed = "completed",
    processing = "processing",
    cancelled = "cancelled"
}



export type StreamTranscriptionItem = {
    speaker_id: string;
    type:string;
    text:string;
    start_ts:number;
    stop_ts:number;
}