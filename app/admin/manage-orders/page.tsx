import Container from "@/app/components/Containers";
import ManageOrdersClient from "./ManageOrdersClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {

    const orders=await getOrders()
    const currentUser =await getCurrentUser()

    if(!currentUser || currentUser.role!=="ADMIN"){
        return<NullData title="Opps! ACCESSS Denided"/>
    }

    return ( <div className="pt-8">
        <Container>
            <ManageOrdersClient orders={orders}/>
        </Container>
    </div> );
}
 
export default ManageOrders;