import url from './URL';

export default async() => {
 // mods strapi4 
 // - adding /api/ to path
 // - adding query string ?populate=* to get ALL product fields
 const request = await fetch(`${url}/api/products?populate=*`).catch(error=> console.log(error));

 const response = await request.json();
 
 if (response.error) {
  return null;
 } else {
  let products = [];
  let data = response.data;
  data.forEach(element => {
   products.push({
     // mods strapi4 
     id: element.id,
     title: element.attributes.title,
     price: element.attributes.price,
     description: element.attributes.description,
     featured: element.attributes.featured,
     created_at: element.attributes.created_at,
     updated_at: element.attributes.updated_at,
     image: `${url}${element.attributes.image.data.attributes.url}`,
   })
  });
  return products
 }

}