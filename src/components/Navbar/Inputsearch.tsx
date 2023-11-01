"use client"
import { useState ,useEffect } from "react"
import { useRouter } from 'next/navigation'

function Inputsearch()
{
    
    const [query ,setQuery]=useState<string | number | readonly string[] | undefined>("")
    const [allData,setAllData]=useState<any[]>([]);
    const route=useRouter()
    let searchApi=`${process.env.API_CALL}/posts?search=${query}`
    useEffect(()=>{
       async function searcher()
       {
        try{
const res=await fetch(searchApi)
        const searchData=await res.json()
        const limitData=searchData.slice(0,4)
        setAllData(limitData)
        }
        catch(err)
        {
            console.log(err)
        }
       }
       searcher()
    },[query])
    function openLink(slug:string)
    {
        route.push(`/blog/${slug}`)
    }
    return(
        <div className="px-5 lg:text-[100%] sm:text-[80%] text-[70%]">
        <input type="text" name="" placeholder="Search a Blog Post Title..." 
        className="lg:w-[410px] px-2 sm:w-9/12 font-normal w-full border-[2px] border-orangecol 
        rounded outline-none text-black" 
        autoComplete="false" autoFocus value={query} onChange={(e)=>setQuery(e.target.value)}/>
        {query && <div className="rounded-[2px] text-orangecol bg-[#ffffff] font-normal
         lg:w-[410px] w-[86%] absolute lg:left-[unset] 
         left-[4%] translate-x-[4%] lg:translate-x-0 shadow-xl z-10">
            {allData?.map((item,i)=><div key={i} className="border-t-black hover:bg-slate-200
            border-t-2 text-start pb-2 w-full px-2" onClick={()=>openLink(item.slug)}>{item?.title?.rendered}</div>)}
        </div>}
        </div>
    )
}
export default Inputsearch
