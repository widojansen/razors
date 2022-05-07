<script>
 export let location;
 import Hero from '../components/Hero.svelte';
 import {link} from 'svelte-routing';
 // featured products
 import Featured from '../components/Products/Featured.svelte'
</script>

<Hero>
 <a href="/products" use:link class="btn btn-primary btn-hero">shop now</a>
</Hero>
<Featured title="featured products"/>