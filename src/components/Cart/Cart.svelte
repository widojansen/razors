<script>
 import globalStore from '../../stores/globalstore';
 import {fly,fade,blur} from 'svelte/transition';
 import {link} from 'svelte-routing';
 import ItemsList from './ItemsList.svelte';
 import user from '../../stores/user';  
 import printJS from 'print-js';
 import { jsPDF } from "jspdf";

 function printPdf() {
    // @TODO: Need to simplify this demo

    console.log('printPdf start')
   var doc = new jsPDF('p', 'mm', 'a4'),
   sizes = [12, 16, 20],
   fonts = [['Times', 'Roman'], ['Helvetica', ''], ['Times', 'Italic']],
   font, size, lines,
   margin = 15, 
   verticalOffset = margin,
   loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\n\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.';

   // Margins:
   doc.setDrawColor(0, 255, 0)
      .setLineWidth(1 / 72)
      .line(margin, margin, margin, 297 - margin)
      .line(210 - margin, margin, 210 - margin, 297 - margin);

   // the 3 blocks of text
   for (var i in fonts) {
      if (fonts.hasOwnProperty(i)) {
         font = fonts[i];
         size = sizes[i];

         lines = doc.setFont(font[0], font[1])
                     .setFontSize(size)
                     .splitTextToSize(loremipsum, 180);
            // Don't want to preset font, size to calculate the lines?
            // .splitTextToSize(text, maxsize, options)
            // allows you to pass an object with any of the following:
            // {
            // 	'fontSize': 12
            // 	, 'fontStyle': 'Italic'
            // 	, 'fontName': 'Times'
            // }
            // Without these, .splitTextToSize will use current / default
            // font Family, Style, Size.
         doc.text(0.5, verticalOffset + size / 72, lines);

         verticalOffset += (lines.length + margin) * size / 72;
      }
   }
   doc.autoPrint();
   doc.output('blob', {filename: 'jsPDF test'});
   //doc.save('jsPDFtest.pdf')
 }

</script>

<div class="cart-overlay" transition:blur>
 <div class="cart-container" id="cart-container" transition:fly={{x:100}}>
 <div class="cart" transition:fade={{delay:400}}>
  <!-- cart header -->
  <div class="cart-header">
   <button class="btn-close" on:click={()=>
    {globalStore.toggleItem('cart', false);}}>
    <i class="fas fa-window-close"></i>
   </button>
   <h2 class="class-title">your bag</h2>
   <span></span>
  </div>
  <!-- end of header -->
  <!-- cart items -->
  <div class="items" id="items">
  <ItemsList />
  </div>
  <!-- end of items -->
  <!-- cart footer -->
  <div class="cart-footer"> 
   {#if $user.jwt}
   <a href="/checkout" 
      use:link
      on:click={()=>{globalStore.toggleItem('cart', false);}}
      class="btn btn-primary btn-block">checkout</a>
   {:else}
    <p class="cart-login">
     In order to checkout please <a href="/login" 
      use:link
      on:click={()=>{globalStore.toggleItem('cart', false);}}
      >login</a>
    </p>
   {/if}
   <div>
   <button class="btn btn-primary btn-block" on:click={() => printJS('items', 'html')}>PrintJs1</button>
   <button class="btn btn-primary btn-block" on:click={() => printJS('cart-container', 'html')}>PrintJs2</button>
   <button class="btn btn-primary btn-block" on:click={() => printPdf()}>JsPdf</button>
   </div>
  </div>
  <!-- end of cart footer -->
 </div>
 </div>
</div>