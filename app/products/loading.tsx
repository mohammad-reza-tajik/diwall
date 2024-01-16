import {Skeleton} from "@/components/ui/skeleton";

function Loading() {

    return (
        <div className={"flex flex-col"}>
            <div className={`flex justify-between items-center my-5 w-full`}>
                <Skeleton className={"w-28 md:w-44 h-5"}/>
                <Skeleton className={"w-28 md:w-44 h-5"}/>
            </div>
            <div
                className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 content-start"}>
                {
                    Array.from({length: 10}).map((_, index) => {
                        return (
                            <Skeleton key={index} className={"h-56 sm:h-96"}/>
                        )
                    })
                }
            </div>
            <Skeleton className={"w-1/3 h-12 my-7 mx-auto"}/>
        </div>
    )
}

export default Loading;