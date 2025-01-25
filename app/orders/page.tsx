import Container from "@/app/components/Containers";
import OrdersClient from "./OrderClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOredersByUserId";

const Orders = async () => {

    const currentUser =await getCurrentUser()

    if(!currentUser){
        return<NullData title="Opps! ACCESSS Denided"/>
    }

    const orders=await getOrdersByUserId(currentUser.id)
    if(!orders){
        return<NullData title="No orders"/>
    }

    

    return ( <div className="pt-8">
        <Container>
            <OrdersClient orders={orders}/>
        </Container>
    </div> );
}
 
export default Orders;