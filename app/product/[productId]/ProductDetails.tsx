"use client"
import Cart from "@/app/cart/page";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/UseCart";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
interface ProductDetailsProps{
    product:any
}
export type CartProductType={
    id:string, name:string, description:string, category:string, brand:string, selectedImg: SelectedImgType,
    quantity:number,
    price:number,
}
export type SelectedImgType={
    color:string, colorCode:string, image:string
}
const Horizontal =()=>{
    return <hr className="w-[30% my-2 ]"/>
}
const ProductDetails:React.FC<ProductDetailsProps> = ({product}) => {
const {handleAddProductCart, cartProducts}=useCart()
const [isProductInCart,setIsProductInCart]=useState(false)
    const[cartProduct,setCartProduct]=useState<CartProductType>({
        id:product.id,
        name:product.name,
        description:product.description,
        category:product.category,
        brand:product.brand,
        selectedImg: {...product.images[0]},
        quantity:1,
        price:product.price
    })
    const router= useRouter()
    console.log(cartProducts)
    useEffect(()=>{
        setIsProductInCart(false)
        
        if(cartProducts){
            const existingIndex=cartProducts.findIndex((item)=>item.id===product.id)
            if(existingIndex>-1){
                setIsProductInCart(true)
            }
        }
    },[cartProducts])
    const productRating = product.reviews?.reduce((acc:number, item:any)=>item.rating+acc, 0)/product.reviews?.length;
    const handleColorSelect =useCallback((value:SelectedImgType)=>{
        setCartProduct((prev)=>{return{...prev,selectedImg:value}})
    },[cartProduct.selectedImg]);
    const handQtyIncrease = useCallback(()=>{   
        console.log("handQtyIncrease 1");
        setCartProduct((prev)=>{
            if(prev.quantity<20){
            return{...prev, quantity : prev.quantity +1}
            }    
            return prev;
        })
    },[])
    const handQtyDecrease = useCallback(()=>{ 
        console.log("handQtyIncrease 2");
        setCartProduct((prev)=>{
        if (prev.quantity > 1)
        {
        return{...prev, quantity : prev.quantity-1};
    }
    return prev;
});
},[])
    return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <h2 className="text-2xl font-medium text-slate-900">{formatPrice(product.price)}</h2>
            <div className="flex item-center gap-2">
                <Rating value={productRating} readOnly/>
                <div>{product.reviews?.length} Відгуки</div>
            </div>
            <Horizontal/>
            <div className="text-justify">{product.description}</div>
            <Horizontal/>
            <div>
                <span className="font-semibold">Категорія: </span>{product.category}
            </div>
            <div>
                <span className="font-semibold">Бренд: </span>{product.brand}
            </div>
            <div className={product.inStock? 'text-teal-400':'text-rose-400'}>{product.inStock?'В наявності' : 'Немає в наявності'}</div>
            <Horizontal/>
            {isProductInCart ? (<>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle className="text-teal-400" size={20}/>
                <span>Товар додано до корзини</span>
            </p>
            <div className="max-w-[300px]">
                <Button label="Перейти до кошика" outline onClick={()=>{router.push('/cart');}}/>
            </div>
            </>):(<>
            <SetColor
            cartProduct={cartProduct}
            images={product.images}
            handleColorSelect={handleColorSelect}/>
            <Horizontal/>
            <SetQuantity
            cartProduct={cartProduct}
            handQtyIncrease={handQtyIncrease}
            handQtyDecrease={handQtyDecrease}/>
            <Horizontal/>
            <div className="max-w-[300px]"><Button  label="Додати до кошика" onClick={()=>handleAddProductCart(cartProduct)}/></div>
            </>)}
            
        </div>
    </div> );
}
 
export default ProductDetails;

