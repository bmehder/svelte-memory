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

    setTimeout(_callback(), 1000)
  }

  // $: console.log($articles)
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
  article {
    position: relative;
    transform-style: preserve-3d;
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  img,
  div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  img {
    transform: rotateY(180deg);
  }
  div {
    background-color: white;
    border: 1px solid #eee;
    backface-visibility: hidden;
  }
  :global(.flipped) {
    transform: rotateY(180deg);
  }
  :global(.matched) {
    transform: rotateY(180deg);
  }
</style>
