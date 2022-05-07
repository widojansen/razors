<script>
 import globalStore from '../../stores/globalstore';
 import {totalItems} from '../../stores/cart';
</script>

<!-- cart togle -->
<div class="btn-cart-container">
 <button class="btn-cart-toggle" on:click={() => {
   globalStore.toggleItem('cart', true);
 }}>
  <i class="fas fa-cart-plus"></i>
 </button>
 <span class="btn-cart-items">{$totalItems}</span>
</div>