"use client"

import { Product } from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import FirebaseApp from "@/libs/firebase";

interface ManageProductsClientProps{
    products:Product[]
}

const ManageProductsClient:React.FC<ManageProductsClientProps> = ({products}) => {

    const router=useRouter();
    const storage =getStorage(FirebaseApp);

    let rows:any=[]
    if(products){
        rows=products.map((product)=>{
            return{
                id:product.id,
                name:product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
            }
        })
    }

    const columns:GridColDef[]=[
        {field:'id',headerName:"ID товару",width:220},
        {field:'name',headerName:"Назва",width:220},
        {field:'prise',headerName:"Ціна(грн)",width:140, renderCell:(params)=>{
            return(<div className="font-bold text-slate-800">{params.row.price}</div>)
        }},
        {field:'category',headerName:"Категорія",width:140},
        {field:'brand',headerName:"Бренд",width:140},
        {field:'inStock',headerName:"Наявність",width:120,renderCell:(params)=>{
            return(<div>{params.row.inStock===true?<Status text="Внаявності" icon={MdDone} bg="bg-teal-200" color="text-teal-700"/>:
                <Status text="Закінчились" icon={MdClose} bg="bg-rose-200" color="text-rose-700"/>

            }</div>)
        },
    },
    {field:'action',headerName:"Дії",width:200,renderCell:(params)=>{
        return(<div className="flex justify-between gap-4 w-full">
                <ActionBtn icon={MdCached} onClick={()=>{
                    handleToggleStock(params.row.id,params.row.inStock);
                }}/>
                <ActionBtn icon={MdDelete} onClick={()=>{
                    handleDelete(params.row.id, params.row.images)
                }}/>
                <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
                    router.push(`/product/${params.row.id}`)
                }}/>
        </div>)
    },},

    ]

    const handleToggleStock=useCallback((id:string,inStock:boolean)=>{
        axios.put("/api/product",{
            id,
            inStock: !inStock,
        }).then((_res)=>{
            toast.success("Product status changed")
            router.refresh();
        }).catch((err)=>{
            toast.error("ops something went wrong")
            console.log("err",err)
        })
    },[])
    
    const handleDelete=useCallback(async(id:string,images:any[])=>{
        toast("Видалення товару зачекайте")

        const handleImageDelete=async()=>{
            try{
                for(const item of images){
                    if(item.image){
                        const imageRef=ref(storage,item.image);
                        await deleteObject(imageRef)
                        console.log("image deleted",item.image)
                    }
                }
            } catch(error){
                return console.log("Deliting image error",error)
            }
        }
        await handleImageDelete()

        axios.delete(`/api/product/${id}`).then((_res)=>{
            toast.success("Товар видалено")
            router.refresh();
        }).catch((err)=>{
            toast.error("Failed")
            console.log("err",err)
        })
    },[])
    return ( <div className="max-w-[1250px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Керування товарами" center/>
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

export default ManageProductsClient;