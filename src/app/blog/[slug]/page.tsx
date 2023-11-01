import { Poppins } from "next/font/google"
const pops=Poppins({subsets:["latin"],weight:["700"]})
import categ from "@/components/Rows/Apicateg";
import Recomend from "@/components/Rows/Recomend";
import Footer from "@/components/Footer/Footer";

async function blogdata(slug:string):Promise<any>
{
    try
    {
    const datas=await fetch(`https://apidatablog.pranjalkv.com/wp-json/wp/v2/posts?slug=${slug}`,{cache:"no-store"})
    const findata=await datas.json();
    console.log("sfsf",findata)
    return findata
}
catch(err)
{
    console.log(err)
}
}

async function imgBlog(imgId:number):Promise<any> 
{
    const imgData=await fetch(`${process.env.API_CALL}/media/${imgId}`)   

    const imgThumb=await imgData.json();
    return imgThumb;
}

export default async function Slugpage({params}:any)
{
    const blogs:any=await blogdata(params.slug)
   const allCateg=await categ()

   function getCateg(catId:number)
   {
    let catName=0
    for(let i=0;i<allCateg.length;i++)
    {
        if(allCateg[i].id==catId)
        catName=allCateg[i].name
    }
    return catName;
   }
   function datFormate(nowDate:string):string
   {
    const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(nowDate);
  return  date.toLocaleDateString('en-US', options);
   }
    const newImg:any=await imgBlog(blogs[0]?.featured_media)
    console.log("sfsf",blogs)
    return(
       <section id="blogpost" className="relative h-[40vh]">
            <img src={newImg?.guid?.rendered} className="w-full h-[40vh] object-cover absolute top-0 left-0 z-[-1]" 
            alt={params.slug}/>
            <div className={`text-[#fcfafa] flex justify-center items-center h-full max-w-[67%] ${pops.className} mx-auto`}>
                <h1 className="lg:text-5xl text-center onBg sm:text-4xl text-3xl drop-shadow-xl font-bold">{blogs[0]?.title?.rendered}</h1>
            </div>
            <div className="sm:flex justify-between block text-center bg-white px-4 py-4 border-b-[0.5px]">
                <div className="flex justify-center flex-wrap">{blogs[0]?.categories?.map((cats:number)=>
                <span className="text-orangecol font-semibold mr-1">{getCateg(cats)}</span>)}
                </div>
                <h5 className="tracking-wide text-slate-400">{datFormate(blogs[0]?.date)}</h5>
            </div>
            <div className="bg-[#ffffff]  w-full">
              <article dangerouslySetInnerHTML={{__html: blogs[0]?.content?.rendered}}
              className="px-5 py-4 max-w-screen-md mx-auto font-control tracking-wide"></article>
            </div>
            <Recomend recId={blogs[0]?.categories[0]} thatId={blogs[0]?.id}></Recomend>
            <Footer></Footer>
        </section>

    )
}