"use client"
import { useCart } from "@/hooks/UseCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps{
    currentUser:SafeUser|null
}


const CartClient:React.FC<CartClientProps> = ({currentUser}) => 
{
    const {cartProducts, handleClearCart,cartTotalAmount}=useCart()

    const router =useRouter()
    if(!cartProducts|| cartProducts.length===0){
        return(
            <div className="flex flex-col items-center">
                <div className="text-2xl">Ваша корзина пуста</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                    <MdArrowBack/>
                    <span>Почніть покупки</span>
                    </Link>
                </div>
            </div>
        )
    }
    return ( <div>
        <Heading title="Корзина ваших покупок" center/>
        
        <div >
            <div className="grid grid-cols-5 text-xl gap-4 pb-2 items-center mt-8 ">
                <div className="col-span-2 justify-self-start">Товари</div>
                <div className="hidden md:block justify-self-center sm:col-span-1">Ціна </div>
                <div className="hidden md:block justify-self-center "> Кількість</div>
                <div className=" hidden md:block justify-self-end "> Загалом</div>
                </div>
                <div>    
                {cartProducts && cartProducts.map((item)=>{
                    return <ItemContent key={item.id} item={item}/>
                })}
                </div>
                </div>
            
        <div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[90px] ">
                    <Button label="Очистити кошик" onClick={()=>{handleClearCart()
                    }} small outline/>
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    
                        <div className="flex justify-between w-full text-base font-semibold">
                        <span>Загалом</span> 
                        <span>{formatPrice(cartTotalAmount)}</span>
                        </div>
                        <p className="text-slate-500">Доставка не враховується у загальну вартість товару</p>
                        <Button label={currentUser? "Замовлення":"Авторизуйтесть для замовлення"} 
                        outline={currentUser? false:true}
                        onClick={()=>
                        {currentUser?router.push("/checkout"):router.push("/login")}}/>
                        <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack/>
                        <span>Продовжити замовлення</span>
                        </Link>
                    
                </div>
            </div>
        </div>
    </div> );
}
export default CartClient;