function Loading() {

    return (
        <>
            <div className={"flex max-md:flex-col max-md:gap-3"}>
                <div className={"flex flex-col gap-2 w-full md:w-1/2 md:pl-10"}>
                    <div className={"skeleton w-full h-80"}/>
                    <div className={"skeleton w-full h-20 md:h-40"}/>
                </div>
                <div className={"flex flex-col gap-10 max-md:p-1 w-full md:w-1/2"}>
                    <div className={"flex justify-between items-center"}>
                        <div className={"skeleton w-64 h-5"}/>
                        <div className={"skeleton w-14 h-5"}/>
                    </div>
                    <div className={"skeleton w-48 h-5"}/>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"skeleton w-full h-4"}/>
                        <div className={"skeleton w-full h-4"}/>
                        <div className={"skeleton w-1/2 h-4"}/>
                    </div>
                    <div className={"skeleton w-1/2 h-5"}/>
                    <div className={"skeleton w-full h-10"}/>
                    <div className={"skeleton w-1/2 h-5"}/>
                    <div className={"flex flex-col md:flex-row max-md:items-center gap-6"}>
                        <div className={"skeleton w-1/2 h-5"}/>
                        <div className={"skeleton w-1/2 h-5"}/>
                    </div>
                    <div className={"skeleton w-full md:w-1/2 h-16 self-end"}/>
                </div>
            </div>
            <div className="divider my-7"/>
            <div className={"skeleton w-full h-32"}/>
            <div className="divider my-7"/>
            <div className={"skeleton w-full h-20"}/>
            <div className={"flex items-center gap-5 my-5"}>
                <div className={"skeleton flex-1 h-80"}/>
                <div className={"skeleton flex-1 h-80"}/>
                <div className={"skeleton max-md:hidden flex-1 h-80"}/>
                <div className={"skeleton max-lg:hidden flex-1 h-80"}/>
            </div>

        </>
    )
}

export default Loading;