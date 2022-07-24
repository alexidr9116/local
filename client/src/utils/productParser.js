import { ASSETS_URL } from "./API";

export function getProductImageUrl(images){
    try{
      
        const image = JSON.parse(images)[0].name.replace('products/','');
        return `${ASSETS_URL.ezo}${image}`;
    }
    catch(err){
        console.log(err)
        return `${ASSETS_URL.image}product.jpg`;
    }
}

export function getProductRating(reviews){
    return (reviews?.reduce((p,c)=>(p+c.rating),0)/reviews?.length);
}