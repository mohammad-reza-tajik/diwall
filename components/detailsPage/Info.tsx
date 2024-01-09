"use client"
import {useState} from "react";
import dynamic from "next/dynamic";
import ReviewsForm from "./ReviewsForm";
import SwiperProducts from "@/components/shared/SwiperProducts";
import type {ProductType} from "@/db/productModel";
import {Create, Package, Review} from "@/components/shared/Icons";

const Reviews = dynamic(() => import("./Reviews"));


interface Props {
    slug: string;
    relatedProducts: ProductType[];
}

function Info({slug, relatedProducts}: Props) {

    const [addReview, setAddReview] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            label: "محصولات مشابه",
            icon: <Package className={"size-6"}/>,
            content: <SwiperProducts products={relatedProducts}/>
        },
        {
            label: "دیدگاه ها",
            icon: <Review className={"size-6"}/>,
            content: <Reviews addReview={addReview} slug={slug}/>
        },
        {
            label: "درج دیدگاه",
            icon: <Create className={"size-6"}/>,
            content: <ReviewsForm setAddReview={setAddReview} slug={slug}/>
        },
    ];

    return (
        <section className={"flex flex-col gap-5 my-10"}>
            <div role="tablist" className="flex bg-white px-2 rounded text-xs md:text-sm">
                {
                    tabs.map((tab, index) => (
                        <button
                            key={index}
                            role={"tab"}
                            className={`flex max-md:flex-col items-center border-b-2 border-b-transparent hover:bg-black/5 transition-all px-3 py-5 font-dana-bold gap-2 ${activeTab === index && "!border-primary text-primary fill-primary"}`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))
                }
            </div>
            <div role="tabpanel" className={"max-md:px-2"}>
                {tabs[activeTab].content}
            </div>
        </section>

    )
}

export default Info