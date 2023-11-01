import { Poppins } from "next/font/google"
import categ from "./Apicateg";
const pops=Poppins({subsets:["latin"],weight:["600"]})
import { FaArrowTrendUp } from "react-icons/fa6";
import Link from "next/link";

interface props{
    pagenum:number

}
async function allBlogs(pageNo:number)
{
    try
    {
        const res=await fetch(`${process.env.API_CALL}/posts?_embed&page=${pageNo}`,{cache:"force-cache"})
    const data= await res.json()
    return data
}
catch(err)
{
    console.log(err)
}
}

async function Content({pagenum}:props)
{
    const blogposts=await allBlogs(pagenum)
    const cres=await categ()
    function getCats(catId:number)
    {
        let catName:string=""
        for(let i=0;i<cres.length;i++)
        {
        if(catId==cres[i].id)
        {
            catName=cres[i].name
        }
    }
    return catName;
    }
    return(
        <section id="content" className="m-1">
            {blogposts.map((ele:any)=><Link href={`/blog/${ele.slug}`}><div key={ele.id} className="w-full lg:w-[630px] 2xl:min-w-[820px] max-w-[660px] 
            lg:m-0 mx-auto rounded shadow-md 
            hover:shadow-2xl cursor-pointer relative bg-[#ffffff] mb-4">
                {( ele._embedded['wp:featuredmedia'] && ele._embedded['wp:featuredmedia'][0]) && 
                <img src={ele?._embedded["wp:featuredmedia"][0].source_url} alt={ele.slug} 
                className="w-full object-cover sm:h-[400px] h-[320px] rounded-t "/>}
                {ele.categories.includes(3) && <div className="text-[#ffffff] flex items-center 
                absolute top-0 left-0 z-10 bg-orangecol rounded-tl rounded-br p-1 font-bold">
                    <FaArrowTrendUp/>
                    <span className="tracking-wide mx-2">TRENDING</span>
                </div>}
            <article className="mx-2 mb-4">
                <h1 className={`md:text-5xl text-3xl my-2 hover:text-orangecol ${pops.className}`}>{ele.title.rendered}</h1>
                <div className="flex uppercase flex-wrap">{ele.categories.map((cats:number)=>
                <span key={cats} className="mt-1 mr-2 text-orangecol 
                font-semibold">{getCats(cats)}</span>)}</div>
                <div className="py-3 2xl:text-lg" dangerouslySetInnerHTML={{__html:ele.excerpt.rendered}}></div>
            </article>
            </div></Link>)}  
               
        </section>
    )
}
export default Content