import { meanBy, chain, init } from '../src/async-iterable-fns'

test('finds mean age', async () => {
  expect(
    await meanBy(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
        yield { name: 'dot', age: 39 }
      })(),
      (x) => x.age
    )
  ).toEqual(20)
})

test('fails on empty collection', async () => {
  try {
    await meanBy(init(0), (x) => x)
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(`Can't find mean of an empty collection`)
  }
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
        yield { name: 'dot', age: 39 }
      })()
    ).meanBy((x) => x.age)
  ).toEqual(20)
})
