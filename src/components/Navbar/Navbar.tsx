"use client"
import Mininav from "./Mininav";
import Inputsearch from "./Inputsearch";
import { useState ,useEffect ,useRef} from "react";
import { REM } from "next/font/google"
import { FaSearch ,FaBars } from "react-icons/fa";
import Link from "next/link";
const remfont=REM({subsets:["latin"]})

function Navbar()
{
   const [bgColors, setBgColors] = useState<boolean>(false);
   const [miniNav,setminiNav]=useState<boolean>(false)
   const [openSearch,setOpensearch]=useState<boolean>(false)
   const navRef: React.RefObject<any> = useRef();
   const searchRef:React.RefObject<any>=useRef()

    function changeNav():void
    {
    if(window.scrollY>20)
    {
        setBgColors(true);
    }
    else
    {
        setBgColors(false);
    }
    }

    function hideNav(e:Event):void
    {
        if(miniNav && navRef.current && !navRef.current.contains(e.target))
        {
            setminiNav(false)
        }
        if(openSearch && searchRef.current && !searchRef.current.contains(e.target))
        {
            setOpensearch(false)
        }
    }
    useEffect(()=>{
        window.addEventListener("scroll",changeNav)
        return()=>window.removeEventListener("scroll",changeNav)
    },[])

    useEffect(()=>{
        window.addEventListener("mousedown",hideNav)
        return()=>window.removeEventListener("mouseup",hideNav)
    },[miniNav,openSearch])
    return(
        <nav className={`${bgColors?"bg-[#ffffff] shadow-lg text-[#000000]":"text-[#ffffff] bg-gradient-to-b from-[#0000006f]"} 
        w-full flex justify-between 
        items-center fixed z-50 px-2 py-1 left-0 top-0 ${remfont.className}`}
         style={{fontSize:"1.3em"}}>
            <Link href="/"><div className="flex items-center sm:text-[1.5em] text-[1.1em] ">
                <img src="/logoPk.png" alt="" className="w-[45px] sm:w-[60px]"/>
                <p className="px-1 font-bold">BLOGSPK</p>
            </div></Link>
            <li className="list-none flex font-semibold cursor-pointer">
                {openSearch && <ul className="absolute top-[70px] w-full
                 lg:static z-[105] left-0 text-center px-4" ref={searchRef}>
                    <Inputsearch></Inputsearch>
                </ul>}
                {!openSearch && <ul className="px-4 flex items-center text-orangecol">
                    <FaSearch onClick={()=>setOpensearch(true)}/>
                </ul>}
                <Link href="/"><ul className="lg:block hidden hover:text-orangecol">
                    HOME
                </ul></Link>
                <Link href="/blogs/page/2">
                <ul className="px-3 lg:block hidden hover:text-orangecol">
                    BLOGS
                </ul></Link>
                <ul className="flex items-center lg:hidden">
                    <FaBars onClick={()=>setminiNav(true)}/>
                </ul>
            </li>
            <div className="absolute right-[10px] top-[70px] shadow-2xl
         z-[100] w-4/12 md:w-3/12 py-2 lg:hidden" ref={navRef}>
                {miniNav && <Mininav></Mininav>}  
            </div>
        </nav>
    )
}
export default Navbar