"use client"

import { Order, User } from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import moment from "moment";

interface ManageOrdersClientProps{
    orders:ExtendedOrder[]
}

type ExtendedOrder=Order &{
    user:User
}

const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {

    const router=useRouter();
    interface OrderRow {
        id: string;
        customer: string;
        amount: string;
        paymentStatus: string;
        date: string;
        deliveryStatus: string;
    }

    let rows:any=[]
    if(orders){
        rows=orders.map((order)=>{
            return{
                id:order.id,
                customer:order.user.name,
                amount: formatPrice(order.amount/100),
                paymentStatus: order.status,
                date: moment(order.createData).fromNow(),
                deliveryStatus: order.deliveryStatus,
                
            }
        })
    }

    const columns:GridColDef[]=[
        {field:'id',headerName:"ID замовлення",width:220},
        {field:'customer',headerName:"Імя клієнта",width:220},
        {field:'amount',headerName:"Ціна(грн)",width:140, renderCell:(params)=>{
            return(<div className="font-bold text-slate-800">{params.row.amount}</div>)
        }},
        {field:'paymentStatus',headerName:"Статус Оплати",width:120,renderCell:(params)=>{
            return(<div>{params.row.paymentStatus ==="pending"?(<Status 
                text="В процесі" 
                icon={MdAccessTimeFilled} 
                bg="bg-slate-200" 
                color="text-slate-700"/>):
                params.row.paymentStatus ==="complete"?(
                <Status text="Оплачено" 
                icon={MdDone} 
                bg="bg-green-200" 
                color="text-green-700"/>
            ):(<></>)

            }</div>)
        },
    },
        {field:'deliverStatus',headerName:"Статус доставки",width:120,renderCell:(params)=>{
            return(<div>{params.row.deliveryStatus ==="pending"?(<Status 
                text="В процесі" 
                icon={MdAccessTimeFilled} 
                bg="bg-slate-200" 
                color="text-slate-700"/>):
                params.row.deliveryStatus ==="dispatched"?(
                <Status text="Відправлено" 
                icon={MdDeliveryDining} 
                bg="bg-green-200" 
                color="text-green-700"/>
            ): params.row.deliveryStatus ==="delivered"?(
            <Status text="Доставлено" 
                icon={MdDone} 
                bg="bg-green-200" 
                color="text-green-700"/>):<></>

            }</div>)
        },
    },
    {field:"date",
        headerName:"Дата",
        width:130,
    },
    {field:'action',headerName:"Дії",width:200,renderCell:(params)=>{
        return(<div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdDeliveryDining} onClick={()=>{
                    handleDispatch(params.row.id);
                }}/>
                <ActionBtn icon={MdDone} onClick={()=>{
                    handleDeliver(params.row.id)
                }}/>
                <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
                    router.push(`/order/${params.row.id}`)
                }}/>
        </div>)
    },},

    ]

    const handleDispatch=useCallback((id:string)=>{
        axios.put("/api/order",{
            id,
            deliveryStatus:"dispatched"
        }).then(()=>{
            toast.success("Order dispatched")
            router.refresh();
        }).catch((err)=>{
            toast.error("ops something went wrong")
            console.log("err",err)
        })
    },[])


    const handleDeliver=useCallback((id:string)=>{
        axios.put("/api/order",{
            id,
            deliveryStatus:"delivered"
        }).then(()=>{
            toast.success("Order delivered")
            router.refresh();
        }).catch((err)=>{
            toast.error("ops something went wrong")
            console.log("err",err)
        })
    },[])
    

    return ( <div className="max-w-[1250px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Керування Платежами" center/>
        </div >
        <div style={{height:600,width:"100%"}}>
        <DataGrid
    rows={rows}
    columns={columns}
    initialState={{ pagination: { paginationModel:{page:0, pageSize:9 },}, }}
    pageSizeOptions={[9, 20]}
    checkboxSelection
    disableRowSelectionOnClick
/>

        </div>
    </div> );
}

export default ManageOrdersClient;