<script>
  import { selectedCards, bestScore } from './store'

  export let card = {}
  export let randomize
  export let clicks = 0

  let articleEl

  // Predicates
  const isCardsMatch = () => $selectedCards[0] === $selectedCards[1]

  const isGameOver = () => {
    const ALL_MATCHES = 16
    return document.querySelectorAll('.matched').length === ALL_MATCHES
  }

  // Update App State
  const addCardItemToSelectedCards = () =>
    ($selectedCards = [...$selectedCards, articleEl.getAttribute('data-name')])

  // DOM Manipulation
  const removeClasses = elClass => {
    document.querySelectorAll(`.${elClass}`).forEach(item => {
      item.classList.remove(elClass)
    })
  }

  const addMatchedClass = () => {
    document.querySelectorAll('.flipped').forEach(item => {
      item.classList.add('matched')
    })
  }

  const toggleFlipped = () => articleEl.classList.toggle('flipped')

  const resetGame = () => {
    alert('Game Over! 🔥')
    removeClasses('matched')
    removeClasses('flipped')

    if (clicks < $bestScore) {
      $bestScore = clicks
    }

    localStorage.setItem('bestScore', $bestScore)

    clicks = 0
    randomize()
  }

  const checkForMatch = () => {
    if ($selectedCards.length < 2) return

    clicks++

    if (isCardsMatch()) {
      addMatchedClass()
    } else {
      removeClasses('flipped')
    }

    $selectedCards = []

    setTimeout(() => isGameOver() && resetGame(), 1000)
  }

  const handleClick = () => {
    toggleFlipped()
    addCardItemToSelectedCards()
  }
</script>

<article
  bind:this={articleEl}
  on:click={handleClick}
  on:transitionend={checkForMatch}
  data-name={card.name}
>
  <img src={card.src} alt={card.name} />
  <div />
</article>

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
