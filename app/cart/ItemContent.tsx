"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/UseCart";

interface ItemContentProps {
    item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const {
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
    } = useCart();

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            {/* Блок зображення та опису товару */}
            <div className="col-span-2 md:col-span-2 flex gap-2 md:gap-4 items-start">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] md:w-[90px] aspect-square shrink-0">
                        <Image
                            src={item.selectedImg.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`} className="font-semibold text-slate-700">
                        {truncateText(item.name)}
                    </Link>
                    <div className="text-slate-500 text-xs md:text-sm">{item.selectedImg.color}</div>
                    <button
                        className="text-red-500 underline mt-2 text-xs self-start"
                        onClick={() => handleRemoveProductFromCart(item)}
                    >
                    Видалити
                    </button>
                </div>
            </div>

            {/* Ціна */}
            <div className="hidden md:block justify-self-center">{formatPrice(item.price)}</div>

            {/* Кількість */}
            <div className="justify-self-center flex items-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={item}
                    handQtyIncrease={() => {
                        handleCartQtyIncrease(item);
                    }}
                    handQtyDecrease={() => {
                        handleCartQtyDecrease(item);
                    }}
                />
            </div>

            {/* Загальна вартість */}
            <div className="justify-self-end font-semibold text-right">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
};

export default ItemContent;
