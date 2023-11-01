import Link from "next/link"
import Content from "./Content"
import Popular from "./Popular"

function Rows()
{
    return(
        <>
        <section id="Rows" className="lg:flex justify-center mt-[50px]">
            <Content pagenum={1}></Content>
            <Popular></Popular>
            <button></button>
        </section>
        <Link href="/blogs/page/2"><button className="flex border-orangecol bg-orangecol mx-auto
        justify-center border-[3px] transition text-white px-2 py-1 hover:scale-[1.08] mb-5 font-semibold shadow-lg rounded-sm">SHOW MORE</button></Link>
        </>
    )
}

export default Rows