window.addEventListener("load", function(){

const header = `
<div class="vz-top">
<div class="vz-top-inner">

<div class="vz-top-item">
🚚 Doprava zdarma od 999 Kč
</div>

<div class="vz-top-item">
⚡ Odeslání do 24 hodin
</div>

<div class="vz-top-item">
📞 774 318 382
</div>

</div>
</div>

<div class="vz-header">

<div class="vz-header-box">

<div class="vz-header-top">

<a href="/" class="vz-real-logo">

<img src="https://www.vycesano.cz/favicon.png" alt="Vyčesáno.cz">

<div class="vz-logo-text">
Vyčesáno<span>.cz</span>
</div>

</a>

<form action="/vyhledavani/" method="get" class="vz-search">

<input type="text" name="string" placeholder="Napište, co hledáte">

<button type="submit">
HLEDAT
</button>

</form>

<div class="vz-cart">
<a href="/kosik/" class="vz-cart-link">
🛒
</a>
</div>

</div>

<div class="vz-menu">

<a href="/pro-psy/">PRO PSY</a>

<a href="/pro-kocky/">PRO KOČKY</a>

<a href="/proti-linani/">PROTI LÍNÁNÍ</a>

<a href="/bestsellery/">BESTSELLERY</a>

<a href="/tipy-rady/">TIPY A RADY</a>

<a href="/faq/">FAQ</a>

<a href="/skrabadla-pro-kocky/" class="vz-active">
ŠKRABADLA
</a>

</div>

</div>
</div>
`;

document.body.insertAdjacentHTML("afterbegin", header);

});
