"use client"

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";


import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps{
    order:Order
}

const OrderDetails:React.FC<OrderDetailsProps> = ({order}) => {


    return ( <div className="max-w-[1150px] m-auto flex flex-col gap-2" >
        <div className="mt-8">
            <Heading title="Деталі замовлення"/>
        </div>
        <div>Order ID:{order.id}</div>
        <div>Загальна сума:<span className="font-bold">{formatPrice(order.amount/100)}</span></div>
        <div className="flex gap-2 item-center">
            <div>Статус платежу:</div>
            <div>
                {order.status==="pending"?<Status
                text="в очікуванні"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"/>:
                order.status==="complete"?<Status
                text="Завершено"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"/>:<></>}
            </div>
        </div>
        <div className="flex gap-2 item-center">
            <div>Стутус доставки:</div>
            <div>
                {order.deliveryStatus==="pending"?(<Status
                text="в очікуванні"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"/>):
                order.deliveryStatus==="dispatched"?(<Status
                text="Відправлений"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"/>): 
                order.deliveryStatus==="delivered"?(<Status
                text="Доставлено"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"/>):(<></>)}
            </div>
        </div>
        <div>Дата: {moment(order.createData).fromNow()}</div>
        <div>
            <h2 className="font-semibold mt-4 mb-2">Інформація про замовлення</h2>
            <div className="grid grid-cols-5 text-xs gap-5 pb-2 items-center">
                <div className="col-span-2 justify-self-start">Товар</div>
                <div className=" justify-self-center">Ціна</div>
                <div className=" justify-self-center">Кількість</div>
                <div className=" justify-self-end">Загалом</div>
            </div>
            {order.products && order.products.map(item=>{
                return<OrderItem key={item.id} item={item}></OrderItem>
            })}
        </div>
    </div>

    );
}

export default OrderDetails;