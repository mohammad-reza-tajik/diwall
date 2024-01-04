"use client"
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/store";
import dynamic from "next/dynamic";
import {HeartOutlined, ShoppingBag, Person} from "@/components/Globals/Icons";
import formUrlQuery from "@/utils/formUrlQuery";
import {useRouter} from "next/navigation";

const Profile = dynamic(() => import("@/components/AccountPage/Profile"));
const Wishlist = dynamic(() => import("@/components/AccountPage/Wishlist"));
const Cart = dynamic(() => import("@/components/AccountPage/Cart"));

function AccountPage() {

    const query = useSearchParams();
    const router = useRouter();

    const user = useAppSelector(state => state.user);

    const [activeTab, setActiveTab] = useState(0);

    const queryTab = query.get("tab");

    useEffect(() => {
        if (queryTab) {
            setActiveTab(Number(queryTab));
        }
    }, [queryTab])




    const tabs = [
        {
            label: "اطلاعات کاربر",
            icon: <Person className={"size-4 md:size-5"}/>,
            content: <Profile {...user}/>
        },
        {
            label: "لیست علاقمندی ها",
            icon: <HeartOutlined className={"size-4 md:size-5"}/>,
            content: <Wishlist {...user}/>
        },
        {
            label: "سبد خرید",
            icon: <ShoppingBag className={"size-4 md:size-5"}/>,
            content: <Cart {...user}/>
        },
    ];

    return (
            <section className={"flex flex-col md:flex-row gap-2 my-10"}>
                <div role="tablist" className="flex flex-row basis-5/5 md:basis-1/5 md:flex-col md:py-4 bg-white rounded text-xs sm:text-sm gap-2">
                    {
                        tabs.map((tab, index) => (
                            <button
                                key={index}
                                role={"tab"}
                                className={`flex justify-center max-md:flex-col items-center max-md:border-b-2 md:border-r-2 border-transparent hover:bg-black/5 transition-all max-md:px-3 py-2 md:py-4 font-dana-bold gap-2 ${activeTab === index && "!border-primary text-primary fill-primary"}`}
                                onClick={() => {
                                    setActiveTab(index);
                                    router.push(formUrlQuery(query.toString(), {
                                        params: {
                                            tab:index
                                        }
                                    }))
                                }}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))
                    }
                </div>
                <div role="tabpanel" className={"basis-4/5"}>
                    {tabs[activeTab].content}
                </div>
            </section>
    )
}

export default AccountPage