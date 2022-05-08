import { writable, derived } from 'svelte/store'
import url from '../strapi/URL';
//import localProducts from '../localProducts'
import getProducts from '../strapi/getProducts';

const store = writable([], ()=>{
 setProducts();
 return () => {}
});

async function setProducts () {
 let products = await getProducts();
 if (products){
  // mods strai4
  //products = flattenProducts(products);
  store.set(products);
 }
}

// mods strapi 4 
// flattened in getproducts

// flatten products
// function flattenProducts(data) {
//   return data.map((item) => {
//     //let image = item.image.url
//     let image = `${url}${item.image.data.attributes.url}`
//     return { ...item, image }
//   })
// }

// featured store
export const featuredStore = derived(store, ($featured) => {
  return $featured.filter((item) => item.featured === true)
})
export default store
