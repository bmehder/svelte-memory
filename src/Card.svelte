<script>
  import { articles } from './store'

  export let card = {}
  export let randomize

  let articleEl

  const isGameOver = () => {
    if (document.querySelectorAll('.matched').length === 16) {
      alert('You won! 🔥')

      document.querySelectorAll('.matched').forEach(item => {
        item.classList.remove('matched')
      })

      document.querySelectorAll('.flipped').forEach(item => {
        item.classList.remove('flipped')
      })

      randomize()
    }
  }

  const checkForMatch = _callback => {
    if ($articles[0] !== $articles[1]) {
      document.querySelectorAll('.flipped').forEach(item => {
        item.classList.remove('flipped')
      })
    } else {
      document.querySelectorAll('.flipped').forEach(item => {
        item.classList.add('matched')
      })
    }

    $articles = []
    setTimeout(_callback, 1000)
    setTimeout(isGameOver, 1000)
  }

  const handleClick = (e, _callback) => {
    articleEl.classList.toggle('flipped')

    $articles = [...$articles, articleEl.getAttribute('data-name')]

    if ($articles.length < 2) return

    setTimeout(_callback, 1000)
  }
</script>

<article
  bind:this={articleEl}
  on:click={e => handleClick(e, checkForMatch)}
  data-name={card.name}
>
  <img src={card.src} alt={card.name} />
  <div />
</article>

<style>
  /*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.3.6,
* Autoprefixer: v10.3.1
* Browsers: last 4 version
*/

  article {
    position: relative;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: all 1s ease;
    -o-transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  img,
  div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  img {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  div {
    background-color: white;
    border: 1px solid #eee;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  :global(.flipped) {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  :global(.matched) {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
</style>
