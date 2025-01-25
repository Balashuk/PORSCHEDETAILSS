import Container from "@/app/components/Containers";
import ListRating from "./ListRating";
import ProductDetails from "./ProductDetails";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
    productId?: string;
}

// Объявляем компонент асинхронным
const Product = async ({ params }: { params: IParams }) => {

    const product =await getProductById(params)
    const user=await getCurrentUser()
    if(!product) return <NullData title="product with the given id is not exist"/>


    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
                <div className="flex flex-col mt-20 gap-4">
                    <AddRating product={product}user={user}/>
                    <ListRating product={product} />
                </div>
            </Container>
        </div>
    );
};

export default Product;
