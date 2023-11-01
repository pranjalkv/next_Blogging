import { Poppins } from "next/font/google"
import Content from "@/components/Rows/Content"
import Popular from "@/components/Rows/Popular"
import Link from "next/link"
const pops=Poppins({subsets:["latin"],weight:["700"]})

export default function Blogpage({params}:any)
{
    const numParams:number=Number(params.currpage)
    return(
    <section id="blogs">


        <div className="h-[30vh] bg-[#808080] w-full flex justify-center items-center" 
        style={{backgroundImage:'url("/ocean.jpg")',backgroundRepeat:"no-repeat",
        backgroundSize:"cover",backgroundPositionX:"center"}}>   
            <h1 className={`sm:text-3xl text-xl text-center text-white ${pops.className}`}>We blog about travel, exciting destinations to visit</h1>
        </div>
        <section id="Rows-blog" className="lg:flex justify-center mt-[50px]">
            <Content pagenum={params.currpage}></Content>
            <Popular></Popular>
        </section>
        <div className="flex justify-center">
            {params.currpage!=1 && <Link href={`/blogs/page/${numParams-1}`}><button type="button"
             className="flex border-orangecol bg-orangecol mx-auto
        justify-center border-[3px] transition text-white px-2 py-1 
        hover:scale-[1.08] mb-5 font-semibold shadow-lg rounded-sm">&lt; PREV</button></Link>}
        {params.currpage!=2 && <Link href={`/blogs/page/${numParams+1}`}><button type="button"
         className="flex border-orangecol bg-orangecol mx-auto
        justify-center border-[3px] transition text-white px-2 py-1 
        hover:scale-[1.08] mb-5 font-semibold shadow-lg rounded-sm">NEXT &gt;</button></Link>}
         </div>
    </section>
    )
}