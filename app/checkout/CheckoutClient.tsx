"use client"

import { useCart } from "@/hooks/UseCart";
import { useRouter } from "next/navigation";
import { useCallback,useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckOutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const requestSentRef = useRef(false);



    useEffect(() => {
        // Логируем состояние перед запросом для отладки
        console.log("Проверка состояния перед запросом:");
        console.log("cartProducts:", cartProducts);
        console.log("paymentIntent:", paymentIntent);
        console.log("clientSecret:", clientSecret);
        console.log("loading:", loading);

        // Проверка, если запрос еще не был отправлен
        if (cartProducts && !clientSecret && !loading && !requestSentRef.current) {
            requestSentRef.current = true; // Устанавливаем флаг
            setLoading(true);
            setError(false);

            console.log("Отправка запроса на создание платежного намерения...");

            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                }),
            })
                .then((res) => {
                    setLoading(false);
                    if (res.status === 401) {
                        return router.push("/login");
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data?.paymentIntent?.client_secret) {
                        console.log("Ответ от сервера:", data);
                        setClientSecret(data.paymentIntent.client_secret);
                        handleSetPaymentIntent(data.paymentIntent.id);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setError(true);
                    toast.error("Что-то пошло не так",error);
                });
        }
    }, [cartProducts, paymentIntent, clientSecret, loading, router]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating",
        },
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);

    return (
        <div className="w-full">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}

            {loading && <div className="text-center">Завантаження</div>}
            {error && <div className="text-center text-rose-500">Помилка</div>}
            {paymentSuccess && (
                <div className="flex items-center flex-col gap-4">
                    <div className="text-teal-500 text-center">Оплата пройшла успішно</div>
                    <div className="max-w-[220px] w-full">
                        <Button label="Переглянути свої замовлення" onClick={() => router.push("/orders")} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckOutClient;