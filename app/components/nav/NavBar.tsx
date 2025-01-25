import Link from "next/link";
import Container from "../Containers";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
const redressed=Redressed({subsets:['latin'],weight:["400"]})
const NavBar= async()=>{
    const currentUser= await getCurrentUser()
    return(<div className="sticky top-0 w-full bg-slate-100 z-30 shadow-sm">
            <div className="py-4 border-b-[1px]">
<Container>
    <div 
    className="flex items-center justify-between gap-4 md:gap-0 ">
        <Link href="/" className= " font-bold text-xl md:text-2xl">PORSCHE DETAILS</Link>
        <div className="hidden md:block">
            <SearchBar/>
        </div>
        <div className="flex items-center gap-4 md:gap-8 ">
        <CartCount/>
        <UserMenu currentUser={currentUser}/>
        </div>
    </div>
</Container> 
            </div>
            <div className="px-4 md:px-0"><Categories/></div>
            
        </div >)
}
export default NavBar;