export default async function categ()
{
    try
    {
    const cres=await fetch(`${process.env.API_CALL}/categories?per_page=100`)
    const cdata= await cres.json()
    return cdata
    }
    catch(error)
    {
        console.log(error)
    }
}