import { sumBy, chain } from '../src/async-iterable-fns'

test('with value selector', async () => {
  expect(
    await sumBy(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual(41)
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })()
    ).sumBy((x) => x.age)
  ).toEqual(41)
})
