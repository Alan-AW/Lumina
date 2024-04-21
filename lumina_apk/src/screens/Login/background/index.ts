export const bgHtml=`
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
<style>

html,
body {
  height: 100%;
}
body {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 254, 234, 1) 0%,
    rgba(255, 254, 234, 1) 35%,
    #b7e8eb 100%
  );
  overflow: hidden;
}

.ocean {
  height: 30vh;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(1, 88, 113, 1);
  opacity: 0.3;
}

.wave {
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="198"><defs><linearGradient id="a" x1="50%" x2="50%" y1="-10.959%" y2="100%"><stop stop-color="%2357BBC1" stop-opacity=".25" offset="0%"/><stop stop-color="%23015871" offset="100%"/></linearGradient></defs><path fill="url(%23a)" fill-rule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" transform="matrix(-1 0 0 1 1600 0)"/></svg>')
    repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  animation: wave 60s linear -40s infinite, swell 10s linear -6s infinite;
}

.wave:nth-of-type(2) {
  top: -198px;
  animation: wave 42s ease-in-out -12s infinite, swell 10s linear -3s infinite;
}

.wave:nth-of-type(3) {
  top: -198px;
  animation: wave 25s ease-in-out 0s infinite, swell 10s linear infinite;
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes swell {
  0%,
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
  50% {
    transform: scale(1, 1.1);
    opacity: 0.5;
  }
}

</style>

<body>
  <div class="ocean">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
</body>

</html>


`