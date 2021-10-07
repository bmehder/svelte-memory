<script>
  import { rawData } from './data'
  import { bestScore } from './store'
  import Card from './Card.svelte'

  let shuffledCards = []
  let cards = []
  let clicks = 0

  const randomizeCards = () => {
    cards = [...rawData, ...rawData]
    shuffledCards = cards.sort(() => Math.random() - 0.5)
  }

  if (localStorage.getItem('bestScore')) {
    $bestScore = localStorage.getItem('bestScore')
  }
</script>

<svelte:body use:randomizeCards />

<main>
  <h1>Memory ({clicks} {clicks === 1 ? 'try' : 'tries'})</h1>
  <h2>Best Score: {$bestScore === Infinity ? 'No score' : $bestScore}</h2>
  <section>
    {#each shuffledCards as card}
      <Card {card} {randomizeCards} bind:clicks />
    {/each}
  </section>
</main>

<style>
  h1,
  h2 {
    margin-bottom: 1rem;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #4158d0;
    background-image: linear-gradient(
      43deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    );
    background-repeat: no-repeat;
    background-size: cover;
  }
  section {
    display: grid;
    grid-template-columns: repeat(4, 10vw);
    grid-template-rows: repeat(4, 10vw);
    gap: 2rem;
    perspective: 800px;
    -webkit-perspective: 800px;
  }
  @media screen and (max-width: 600px) {
    h1 {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
</style>
