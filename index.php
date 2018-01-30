<!DOCTYPE html>
<html lang="en">
  <head>
    <title>EmojiClicker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#db5945">
    <link rel="stylesheet" type="text/css" href="./style/reset.css" />
    <link rel="stylesheet" type="text/css" href="./style/main.css" />
    <script data-main="js/Game" src="./js/require.js"></script>
    <link rel="manifest" href="/emojiclicker/manifest.webmanifest">
    <link rel="shortcut icon" href="/emojiclicker/favicon.ico" />
  </head>

  <body>
    <div id="loadingscreen">
      <h1>LOADING, PLEASE WAIT...</h1>
    </div>

    <header>
      <div>
        <h1>EM😂JICLICKER</h1>
      </div>
    </header>
    
    <div class="container">    
      <aside>
        <div>
          <h4>Emoji Shop</h4>
          <ul id="shop">
          </ul>
        </div>
      </aside>

      <main id="gamescreen">
        <div id="pcount">
          <h3><span id="points"></span> points</h3>
          <h4><span id="pps"></span> PPS</h4>
          <h5><span id="clickdamage"></span> Click Damage</h4>
        </div>
        <div id="canvas">
          <img alt="emoji" id="emoji" />
        </div>
        <footer>
          <div class="small">
            &copy; Jere Tapaninen 2017
          </div>
        </footer>
      </main>
    </div>
  </body>
</html>