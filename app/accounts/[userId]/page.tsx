"use client"
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/store";
import {HeartOutlined, ShoppingBag, Person} from "@/components/shared/Icons";
import buildURL from "@/lib/utils/buildURL";
import {useRouter} from "next/navigation";
import  cn  from "@/lib/utils/cn"
import Profile from "@/components/accountPage/Profile";
import Wishlist from "@/components/accountPage/Wishlist";
import Cart from "@/components/accountPage/Cart";

function AccountPage() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const user = useAppSelector(state => state.user.user);

    const [activeTab, setActiveTab] = useState(0);

    const tabQuery = searchParams.get("tab");

    useEffect(() => {
        if (tabQuery) {
            setActiveTab(Number(tabQuery));
        }
    }, [tabQuery])

    const tabs = [
        {
            label: "اطلاعات کاربر",
            icon: <Person className={"size-4 md:size-5"}/>,
            content: <Profile user={user}/>
        },
        {
            label: "لیست علاقمندی ها",
            icon: <HeartOutlined className={"size-4 md:size-5"}/>,
            content: <Wishlist user={user}/>
        },
        {
            label: "سبد خرید",
            icon: <ShoppingBag className={"size-4 md:size-5"}/>,
            content: <Cart user={user}/>
        },
    ];

    return (
            <section className={"flex flex-col md:flex-row gap-2 my-10"}>
                <div role={"tablist"} className={"flex flex-row basis-5/5 md:basis-1/5 md:flex-col bg-muted text-muted-foreground fill-muted-foreground rounded overflow-hidden text-xs lg:text-sm gap-2"}>
                    {
                        tabs.map((tab, index) => (
                            <button
                                key={index}
                                role={"tab"}
                                className={cn("flex justify-center max-md:flex-col items-center max-md:px-3 py-2 md:py-4 font-dana-bold gap-2",{"text-white bg-primary fill-white" : activeTab === index})}
                                onClick={() => {
                                    setActiveTab(index);
                                    router.push(buildURL({
                                        query: {
                                            tab: index + ""
                                        },
                                    }))
                                }}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))
                    }
                </div>
                <div role={"tabpanel"} className={"basis-4/5"}>
                    {tabs[activeTab].content}
                </div>
            </section>
    )
}

export default AccountPage