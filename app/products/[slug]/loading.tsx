import {Skeleton} from "@/components/ui/skeleton";

function Loading() {

    return (
        <>
            <div className={"flex max-md:flex-col max-md:gap-3"}>
                <div className={"flex flex-col gap-2 w-full md:w-1/2 md:pl-10"}>
                    <Skeleton className={"w-full h-80"}/>
                    <Skeleton className={"w-full h-20 md:h-40"}/>
                </div>
                <div className={"flex flex-col gap-10 max-md:p-1 w-full md:w-1/2"}>
                    <div className={"flex justify-between items-center"}>
                        <Skeleton className={"w-64 h-5"}/>
                        <Skeleton className={"w-14 h-5"}/>
                    </div>
                    <div className={"w-48 h-5"}/>
                    <div className={"flex flex-col gap-2"}>
                        <Skeleton className={"w-full h-4"}/>
                        <Skeleton className={"w-full h-4"}/>
                        <Skeleton className={"w-1/2 h-4"}/>
                    </div>
                    <Skeleton className={"w-1/2 h-5"}/>
                    <Skeleton className={"w-full h-10"}/>
                    <Skeleton className={"w-1/2 h-5"}/>
                    <div className={"flex flex-col md:flex-row max-md:items-center gap-6"}>
                        <Skeleton className={"w-1/2 h-5"}/>
                        <Skeleton className={"w-1/2 h-5"}/>
                    </div>
                    <Skeleton className={"w-full md:w-1/2 h-16 self-end"}/>
                </div>
            </div>
            <div className="divider my-7"/>
            <Skeleton className={"w-full h-32"}/>
            <div className="divider my-7"/>
            <Skeleton className={"w-full h-20"}/>
            <div className={"flex items-center gap-5 my-5"}>
                <Skeleton className={"flex-1 h-80"}/>
                <Skeleton className={"flex-1 h-80"}/>
                <Skeleton className={"max-md:hidden flex-1 h-80"}/>
                <Skeleton className={"max-lg:hidden flex-1 h-80"}/>
            </div>

        </>
    )
}

export default Loading;