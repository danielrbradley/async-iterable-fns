import { init, count, toArray, initRaw, map, filter } from '../src/async-iterable-fns'

export function primes() {
  const primes = init({ from: 1, to: 100 })
    .map((x) => ({
      x,
      factors: init({ from: 1, to: x }).filter((y) => x % y === 0),
    }))
    .filter((num) => num.factors.count() === 2)
    .map((num) => num.x)
}

export function grouping() {
  const oddAndEven = init({ from: 1, to: 25 })
    .groupBy((i) => (i % 2 === 0 ? 'even' : 'odd'))
    .map(([key, values]) => [key, toArray(values)])
}

export function primesNoChaining() {
  const range = initRaw({ from: 1, to: 100 })
  const mapped = map(range, (x) => ({
    x,
    factors: filter(initRaw({ from: 1, to: x }), (y) => x % y === 0),
  }))
  const filtered = filter(mapped, (num) => count(num.factors) === 2)
  const primes = map(filtered, (num) => num.x)
}
