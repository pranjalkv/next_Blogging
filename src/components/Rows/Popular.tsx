import { promises as fs } from 'fs';
import Link from 'next/link';

async function Popular()
{
   
  const file = await fs.readFile(process.cwd() + '/public/popular.json', 'utf8');
  const data = JSON.parse(file);


    return(
        <section id="popular">
        <div className="w-[96%] sm:w-[310px] 
         bg-white border-t-8 border-orangecol rounded lg:ml-[50px] lg:m-0 mx-auto">
            <h1 className="my-4 text-center font-semibold text-xl text-orangecol">Most Popular</h1>
            {data.map((ele:any)=><div key={ele.id} className="relative flex flex-col justify-center items-center pb-4 cursor-pointer">
                <Link href={`/blog/${ele.slug}`}>
                <img src={ele.cover} style={{width:"280px",height:"150px"}} alt={ele.slug} />
                <h1 className="font-semibold w-[280px] m-1 hover:text-orangecol">{ele.title}</h1>
                </Link>
            </div>)}
        </div>
        </section>
    )
}

export default Popular