'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps{
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handQtyIncrease:()=> void;
    handQtyDecrease:()=> void;

}

const btnStyles="border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQtyProps> = ({
    cartProduct , cartCounter , handQtyDecrease, handQtyIncrease,
}) => {
    return ( <div className="flex gap-8 items-center">
        {cartCounter? null : <div className="font-semibold">Кількість:</div>}
        <div className="flex gap-4  items-center text-base">
            <button onClick={handQtyDecrease} className={btnStyles}>-</button>
            <div>{cartProduct.quantity}</div>
            <button onClick={handQtyIncrease} className={btnStyles}>+</button>
        </div>

    </div> );
}
 
export default SetQuantity;