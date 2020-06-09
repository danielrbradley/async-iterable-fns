import { count, initRaw, map, filter, toArray, init } from '../src/async-iterable-fns'

const findPrimes = async () => {
  const range = initRaw({ from: 1, to: 100 })
  const mapped = map(range, (x) => ({
    x,
    factors: filter(initRaw({ from: 1, to: x }), (y) => x % y === 0),
  }))
  const filtered = filter(mapped, async (num) => (await count(num.factors)) === 2)
  const primes = map(filtered, (num) => num.x)
  return toArray(primes)
}

const findPrimesChained = async () => {
  const primes = init({ from: 1, to: 100 })
    .map((x) => ({
      x,
      factors: init({ from: 1, to: x }).filter((y) => x % y === 0),
    }))
    .filter(async (num) => (await num.factors.count()) === 2)
    .map((num) => num.x)

  for await (const prime of primes) {
    console.log(prime)
  }
}
