<script>
 import user from "../stores/user";
 import {link} from 'svelte-routing';
 // logout func
 import globalStore from "../stores/globalstore";
</script>

{#if $user.jwt}
<a href="/" class="logout-btn" on:click={() => {
 globalStore.toggleItem('sidebar', false);
}}>logout</a>
{:else}
<a href="/login" on:click={() => {
 globalStore.toggleItem('sidebar', false);
}}>login</a>
{/if}