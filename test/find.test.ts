import { find, chain } from '../src/async-iterable-fns'

test('finds match', () => {
  expect(
    find(
      (function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'bob'
    )
  ).toEqual({ name: 'bob', id: 2 })
})

test('returns undefined when not found', () => {
  expect(
    find(
      (function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'cat'
    )
  ).toBeUndefined()
})

test('finds by index', () => {
  expect(
    find(
      (function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x, index) => index === 1
    )
  ).toEqual({ name: 'bob', id: 2 })
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })()
    ).find((x) => x.name === 'bob')
  ).toEqual({ name: 'bob', id: 2 })
})
