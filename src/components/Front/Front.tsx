"use client"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa";
import { useEffect,useState } from "react"
const pops=Poppins({subsets:["latin"],weight:["400","700"]})

function Front()
{
   
    const[coverData,setcoverData]=useState<Array<any>>([])
    const[eleData,setEledata]=useState<number>(0)
    useEffect(()=>{coverBlog()},[])

    async function coverBlog():Promise<void>
    {
       try
       {
         const res=await fetch("/cover.json")
        const data:any=await res.json()
        setcoverData(data)
    }
    catch(err)
    {
        console.log(err)
    }
    }
    function nextCover()
    {
        if(eleData==3)
        {
            setEledata(0)
        }
        setEledata(eleData=>eleData + 1)
    }
    function prevCover()
    {
        if(eleData==0)
        {
            setEledata(3)
        }
        setEledata(eleData=>eleData - 1)
    }
    return(
        <div className={pops.className} style={{position:"relative",height:"75vh"}}>
            <img src={coverData[eleData]?.cover} className="w-full h-[75vh] object-cover 
            absolute top-0 left-0 z-[-1]" 
            alt="copenhagen"/>
            <div className="text-[#ffffff] flex justify-center items-center h-full max-w-[67%]  mx-auto">
                <h1 className="lg:text-6xl sm:text-5xl 
                text-3xl drop-shadow-xl font-bold onBg">{coverData[eleData]?.title}</h1>
            </div>
            <div className="absolute bottom-[20px] px-5 flex justify-between w-full text-[#ffffff]">
                <button onClick={nextCover} className="flex text-[80%] sm:text-[100%]
                items-center text-lg shadow-lg"><FaChevronLeft size="1.2em"/> PREV</button>
                <Link href={`/blog/${coverData[eleData]?.slug}`}><div
                 className="font-semibold tracking-wider border-[3px] transition-colors
                 hover:bg-orangecol shadow-xl md:text-[100%] sm:text-[80%] text-[70%] hover:border-orangecol p-1">READ MORE</div></Link>
                <button onClick={prevCover} className="flex text-[80%] sm:text-[100%]
                items-center text-lg shadow-lg">NEXT <FaChevronLeft size="1.2em" className="rotate-180" /></button>
            </div>
        </div>
    )

}
export default Front