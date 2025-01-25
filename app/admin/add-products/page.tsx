import Container from "@/app/components/Containers";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async() => {

    const currentUser= await getCurrentUser()

    if(!currentUser || currentUser.role!=="ADMIN"){
        return<NullData title="Opps! ACCESSS Denided"/>
    }
    return ( <div className="p-8">
        <Container>
            <FormWrap>
                <AddProductForm/>
            </FormWrap>
          
        </Container>
    </div> );
}
 
export default AddProducts;