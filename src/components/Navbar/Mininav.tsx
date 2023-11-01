import Link from "next/link"

function Mininav()
{
    return(
        
        <li className="list-none text-center cursor-pointer text-[#000000] bg-white py-2 font-bold">
           <Link href="/"><ul className="pb-2 hover:text-orangecol">HOME</ul></Link> 
           <Link href="/blogs/page/2"><ul className="border-t-4 border-b-4 border-orangecol py-2 
            hover:text-orangecol">BLOG</ul></Link> 
        </li>
       
    )
}
export default Mininav