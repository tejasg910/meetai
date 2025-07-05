import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, ClockIcon, LoaderIcon, VideoIcon } from "lucide-react";
import { CommandSelect } from "./command-select";
import { MeetingStatus } from "../../types";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

const opitons = [
    {
        id: MeetingStatus.upcomming, value: MeetingStatus.upcomming,


        children: (
            <div className="flex items-center gap-x-2 capitalize ">

                <ClockArrowUpIcon />
                {MeetingStatus.upcomming}
            </div>
        )

    },
    {
        id: MeetingStatus.completed, value: MeetingStatus.completed,


        children: (
            <div className="flex items-center gap-x-2 capitalize ">

                <CircleCheckIcon />
                {MeetingStatus.completed}
            </div>
        )

    },
    {
        id: MeetingStatus.active, value: MeetingStatus.active,


        children: (
            <div className="flex items-center gap-x-2 capitalize ">

                <VideoIcon />
                {MeetingStatus.active}
            </div>
        )

    },
    {
        id: MeetingStatus.processing, value: MeetingStatus.processing,


        children: (
            <div className="flex items-center gap-x-2 capitalize ">

                <LoaderIcon />
                {MeetingStatus.processing}
            </div>
        )

    },
    {
        id: MeetingStatus.cancelled, value: MeetingStatus.cancelled,


        children: (
            <div className="flex items-center gap-x-2 capitalize ">

                <CircleXIcon />
                {MeetingStatus.cancelled}
            </div>
        )

    },
]


export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    return (
        <CommandSelect
            value={filters.status ?? ""}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            options={opitons}
            placeholder="Status"
            className="h-9 "
        />
    )
}