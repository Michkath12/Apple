<template>
<footer class="p-5">
  <div class="footer sm:footer-horizontal bg-neutral-content text-neutral p-10 ">
    <aside class="text-xl">
      <a class="btn btn-ghost text-xl">
          <img src="../assets/images/logo-apple.png" alt="" class="h-8 w-8 object-contain">
      </a>
      <p>
        Apple Industries Ltd.
        <br />
        Providing reliable tech since 1976
      </p>
    </aside>
    <nav class="text-xl">
      <h6 class="footer-title">Company</h6>
      <a class="link link-hover">A propos</a>
      <a class="link link-hover">Produits</a>
      <a class="link link-hover">Contacts</a>
    
    </nav>
    <form class="text-xl">
      <h6 class="footer-title">Newsletter</h6>
      <fieldset class="w-80">
        <label>Enter your email address</label>
        <div class="join">
          <input
            type="text"
            placeholder="username@site.com"
            class="input input-bordered join-item" />
          <button class="btn btn-neutral join-item">Subscribe</button>
        </div>
      </fieldset>
    </form>
  </div>
</footer>
</template>
