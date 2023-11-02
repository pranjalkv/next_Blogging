import Link from "next/link";
async function apiRec(recId:number)
{
    try
    {
        const getData=await fetch(`${process.env.API_CALL}/posts?categories=${recId}&per_page=4&_embed`)
    const data=getData.json();
    return data
}
catch(err)
{
    console.log(err)
}
}
interface props
{
    thatId:number
    recId:number
}
async function Recomend({thatId,recId}:props)
{
    const apiData=await apiRec(recId)
    function cutWord(str:string)
    {
        return str.length>47 ? str.slice(0,47)+"..." : str;
    }
    return(
        <>
        {(apiData.length > 1) && <h1 className="text-center my-4 text-4xl font-semibold text-slate-600">Just For You</h1>}
        <section id="recomend" className="max-w-screen-lg mx-auto flex lg:justify-center justify-around 
        flex-wrap pb-[100px]">
            {apiData.map((ele:any)=>(ele.id!=thatId && <Link href={`/blog/${ele.slug}`}><div key={ele.id} className="w-[300px] mr-1">
            {( ele._embedded['wp:featuredmedia'] && ele._embedded['wp:featuredmedia'][0])
             && <img src={ele?._embedded["wp:featuredmedia"][0].source_url} 
             className="w-full object-cover h-[200px]" alt="" />}
            <h1 className="m-1 text-[1.2em] font-semibold hover:text-orangecol">
                {cutWord(ele?.title?.rendered)}</h1>
            </div></Link>))}
            
        </section>
                </>
    )
}
export default Recomend
