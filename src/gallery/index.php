<?php require "server/gallery.php"; ?>
<!doctype html>
<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<!-- Paradise ~ centerkey.com/paradise                         -->
<!-- GPLv3 ~ Copyright (c) individual contributors to Paradise -->
<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<html lang=en>
<head>
<meta charset=utf-8>
<meta name=viewport                   content="width=device-width, initial-scale=1">
<meta name=apple-mobile-web-app-title content="Gallery">
<meta property=og:title               content="<?=$settings->title?>">
<meta property=og:description         content="<?=$settings->subtitle?>">
<meta property=og:type                content="website">
<meta property=og:image               content="<?=$values->cardImageUrl?>">
<meta property=og:image:alt           content="<?=$settings->title?>">
<title><?=$settings->title?> &bull; <?=$settings->subtitle?></title>
<link rel=icon             href=https://centerkey.com/paradise/graphics/bookmark.png>
<link rel=apple-touch-icon href=<?=$values->thumbnailUrl?>>
<link rel=stylesheet       href="<?=$values->titleFontUrl?>">
<link rel=stylesheet       href=https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.3/css/all.min.css>
<link rel=stylesheet       href=https://cdn.jsdelivr.net/jquery.magnific-popup/1.0/magnific-popup.css>
<link rel=stylesheet       href=https://cdn.jsdelivr.net/npm/dna.js@1.4/dna.css>
<link rel=stylesheet       href=https://centerkey.com/css/reset.css>
<link rel=stylesheet       href=paradise.css>
<link rel=stylesheet       href=~data~/custom-style.css>
<style>
   h1 {
      font-family: "<?=$settings->{"title-font"}?>", sans-serif;
      font-size: <?=$settings->{"title-size"}?>;
      }
</style>
</head>
<body class="<?=$values->styleClasses?>">

<header>
   <h1 data-href=.><?=$settings->title?></h1>
   <h2><?=$settings->subtitle?></h2>
</header>

<main>
   <aside data-href=console>&nbsp;&nbsp;</aside>
   <nav id=gallery class=dna-menu>
      <span class=<?=showHideClass($pages[0]->show)?>><?=$pages[0]->title?></span>
      <span class=<?=showHideClass($pages[1]->show)?>><?=$pages[1]->title?></span>
      <span class=<?=showHideClass($pages[2]->show)?>><?=$pages[2]->title?></span>
      <span class=<?=showHideClass(false)?>>Thanks</span>
   </nav>
   <div id=gallery-panels class=dna-panels>
      <section data-hash=images class=gallery-images>
         <h3 class=hide-me>Gallery Images</h3>
         <?=getImagesHtml($gallery)?>
      </section>
      <section data-hash=artist>
         <h3 class=hide-me>The Artist</h3>
         <?=$values->artistPageHtml?>
      </section>
      <section data-hash=contact class=external-site>
         <h3>Contact the Artist</h3>
         <form class=send-message>
            <label>
               <span>Message:</span>
               <textarea name=message placeholder="Enter your message" required></textarea>
            </label>
            <label>
               <span>Name:</span>
               <input name=name placeholder="Enter your name">
            </label>
            <label>
               <span>Email:</span>
               <input name=email type=email placeholder="Enter your email address">
            </label>
            <p>
               <button type=submit>Send message</button>
            </p>
         </form>
         <nav>Gallery powered by <a href=https://centerkey.com/paradise>Paradise</a></nav>
      </section>
      <section data-hash=thanks>
         <h3>Thanks!</h3>
         <p>Your message has been sent.</p>
      </section>
   </div>
</main>

<footer>
   <div class=<?=showHideClass($settings->{"cc-license"})?>>
      <a class=external-site rel=license href=https://creativecommons.org/licenses/by-sa/4.0>
         <img src=https://i.creativecommons.org/l/by-sa/4.0/80x15.png alt=license
            title="This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.">
      </a>
   </div>
   <div class=<?=showHideClass($settings->bookmarks)?>><div id=social-buttons></div></div>
   <div><?=$settings->footer?></div>
</footer>

<script src=https://cdn.jsdelivr.net/npm/browser-fetch-json@0.2/fetch-json.min.js></script>
<script src=https://cdn.jsdelivr.net/npm/jquery@3.3/dist/jquery.min.js></script>
<script src=https://cdn.jsdelivr.net/npm/dna.js@1.4/dna.min.js></script>
<script src=https://cdn.jsdelivr.net/npm/magnific-popup@1.1/dist/jquery.magnific-popup.min.js></script>
<script src=paradise.js></script>
</body>
</html>
