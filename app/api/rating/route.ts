import { getCurrentUser } from "@/actions/getCurrentUser";

import { NextResponse } from "next/server";


export async function POST(request:Request) {
    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body =await request.json()
    const {comment,rating,product,userId}=body;

    //const deliveredOrder=currentUser?.oreders.some(order=>order.products.find(item=>item.id===product.id) && order.deliveryStatus==="delivered")

    //const userReview=product?.rewiews.find(((review:Review)=>{
       // return review.userId===currentUser.id
    //}))
    //if(userReview || !deliveredOrder){
        //return NextResponse.error()
    //}
    const review =await prisma?.review.create({
        data:{
            comment,
            rating,
            productId:product.id,
            userId
        }
    })

    return NextResponse.json(review)
    
}