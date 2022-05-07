<script>
 import SmallNavbar from "./SmallNavbar.svelte";
 import BigNavbar from "./BigNavbar.svelte";
 import globalStore from '../../stores/globalstore';
 let toggleSize = 992;
 let screenWidth;
 $: if (screenWidth > toggleSize) {
  globalStore.toggleItem('sidebar', false);
 }
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if screenWidth > toggleSize}
 <BigNavbar/>
{:else}
 <SmallNavbar/>
{/if}
<!-- 
 -->