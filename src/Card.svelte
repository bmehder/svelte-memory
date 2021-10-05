<script>
  import { articles, bestScore } from './store'

  export let card = {}
  export let randomize
  export let clicks = 0

  let articleEl
  let isWaiting = false

  // Predicates
  const isCardsMatch = () => $articles[0] === $articles[1]

  const isGameOver = () => {
    const ALL_MATCHES = 16
    return document.querySelectorAll('.matched').length === ALL_MATCHES
  }

  const updateArticleState = () =>
    ($articles = [...$articles, articleEl.getAttribute('data-name')])

  // DOM Manipulation
  const removeFlippedClasses = () => {
    document.querySelectorAll('.flipped').forEach(item => {
      item.classList.remove('flipped')
    })
  }

  const removeMatchedClasses = () => {
    document.querySelectorAll('.matched').forEach(item => {
      item.classList.remove('matched')
    })
  }

  const addMatchedClass = () => {
    document.querySelectorAll('.flipped').forEach(item => {
      item.classList.add('matched')
    })
  }

  const toggleFlipped = () => articleEl.classList.toggle('flipped')

  // Reset State and Init
  const resetGame = () => {
    alert('Game Over! 🔥')
    removeMatchedClasses()
    removeFlippedClasses()

    if (clicks < $bestScore) {
      $bestScore = clicks
    }

    localStorage.setItem('bestScore', $bestScore)

    clicks = 0
    randomize()
  }

  // Event Listener Callback
  const checkForMatch = () => {
    isWaiting = true
    if (isCardsMatch()) {
      addMatchedClass()
    } else {
      removeFlippedClasses()
    }

    $articles = []

    isWaiting = false
    setTimeout(() => isGameOver() && resetGame(), 1000)
  }

  // Event Listener
  const handleClick = (e, checkForMatch) => {
    toggleFlipped()
    updateArticleState()

    if ($articles.length < 2) return

    clicks++

    setTimeout(checkForMatch, 800)
  }

  $: console.log(clicks)
</script>

{#if !isWaiting}
  <article
    bind:this={articleEl}
    on:click={e => handleClick(e, checkForMatch)}
    data-name={card.name}
  >
    <img src={card.src} alt={card.name} />
    <div />
  </article>
{/if}

{#if isWaiting}
  <article bind:this={articleEl} data-name={card.name}>
    <img src={card.src} alt={card.name} />
    <div />
  </article>
{/if}

<style>
  article {
    position: relative;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: all 1s ease;
    -o-transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: all 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  img,
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  img {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  div {
    background-color: white;
    border: 1px solid #eee;
    /* -webkit-backface-visibility: hidden; */
    /* backface-visibility: hidden; */
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
