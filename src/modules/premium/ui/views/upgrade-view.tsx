"use client"

import { useSuspenseQuery } from "@tanstack/react-query"


import { useTRPC } from "@/trpc/client"
import { authClient } from "@/lib/auth-client"
import { ErrorState } from "@/components/error"
import { LoadingState } from "@/components/loading"
import { auth } from "@/lib/auth"
import { PricingCard } from "../components/pricing-card"
export const UpgradedViewLoading = ()=>{
    return (
        <LoadingState title="Loading..." description="This may take a few seconds" />

    )


}

export const UpgradeViewError = ()=>{
    return <ErrorState title="Error" description="Please try again later"/>
}

export  const UpgradeView = ()=>{

    const trpc = useTRPC();
    const {data:products} = useSuspenseQuery(trpc.premium.getProducts.queryOptions());
    const {data:currentSubscription} = useSuspenseQuery(trpc.premium.getCurrentSubscription.queryOptions());

return (
    <div className="flex-1 py-4 md:px-8 flex flex-col gap-y-10">

    <div className="mt-4 flex-1 flex flex-col gap-y-10 items-center">
    <h5 className="text-2xl font-medium md:text-3xl">You are on the {" "}

        <span className="font-semibold text-primary">{currentSubscription?.name ?? "Free"}</span> {" "} plan
    </h5>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{
    products.map((product)=>{
        const isCurrent = product.id === currentSubscription?.id;
        const isPremium = !!currentSubscription;
        let buttonText= "Upgrade";
        let onClick = ()=>authClient.checkout({products:[product.id]});
        if(isCurrent){
            buttonText = "Manage";
            onClick = ()=> authClient.customer.portal();
        } else if (isPremium){
            buttonText = "Change plan";
            onClick = ()=> authClient.customer.portal();
        }
        return (
            <PricingCard
                key={product.id}
                variant={product.metadata.variant ==="highlighted" ? "highlighted" : "default"}
                price={product.prices[0].amountType==="fixed" ? product.prices[0].priceAmount / 100 : 0}
                features={product.benefits.map((benefit) => benefit.description)}
                buttonText={buttonText}
                onClick={onClick}
                title={product.name}
                description={product.description

                }
badge={product.metadata.badge as string | null}
                priceSuffix={`/${product.prices[0].recurringInterval}`}
            />
        )
    })
}
    </div>
    </div>
    </div>
)
}