/**
 * Creates an array from the source async-iterable object.
 * @param source An AsyncIterable objext to convert to an array.
 * @example
 * async function* source() {
 *   yield 1
 *   yield 2
 * }
 * await toArray(source())
 * // Returns: [1, 2]
 */
export async function toArray<T>(source: AsyncIterable<T>): Promise<T[]> {
  const target: T[] = []
  for await (const item of source) {
    target.push(item)
  }
  return target
}

/**
 * Creates a new iterable whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param source The input collection.
 * @param mapping A function to transform items from the input collection.
 * @example
 * map(
 *   init({ from: 1, to: 3 }),
 *   (x) => x * 2
 * ) // Yields: 2, 4, 6
 */
export async function* map<T, U>(
  source: AsyncIterable<T>,
  mapping: (item: T, index: number) => U
): AsyncIterable<U> {
  let index = 0
  for await (const item of source) {
    yield mapping(item, index)
    index++
  }
}

/**
 * Returns a new iterable containing only the elements of the collection for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 * @example
 * filter(
 *   init({ from: 1, to: 4 }),
 *   (x) => x % 2 === 0
 * ) // Yields: 2, 4
 */
export async function* filter<T>(
  source: AsyncIterable<T>,
  predicate: (item: T, index: number) => boolean
): AsyncIterable<T> {
  let index = 0
  for await (const item of source) {
    if (predicate(item, index)) {
      yield item
    }
    index++
  }
}

/**
 * Applies the given function to each element of the sequence and returns a new sequence comprised of the results for each element where the function returns a value.
 * This can be thought of as doing both a filter and a map at the same time.
 * @param source The input collection.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 * @example
 * choose(
 *   init({ from: 1, to: 3 }),
 *   (x) => (x % 2 === 1 ? x * 2 : undefined)
 * ) // Yields: 2, 6
 */
export async function* choose<T, U>(
  source: AsyncIterable<T>,
  chooser: (item: T, index: number) => U | undefined
): AsyncIterable<U> {
  let index = 0
  for await (const item of source) {
    const chosen = chooser(item, index)
    if (chosen !== undefined) {
      yield chosen
    }
    index++
  }
}

/**
 * Applies the given function to each element of the source iterable and concatenates all the results.
 * @param source The input collection.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 * @example
 * collect(
 *   init({ from: 1, to: 3 }),
 *   function* (x) {
 *     yield x
 *     yield x
 *   }
 * ) // Yields: 1, 1, 2, 2, 3, 3
 *
 * // You can also just return an array from your mapping function
 * collect(
 *   init({ from: 1, to: 3 }),
 *   (x) => [x, x]
 * )
 */
export async function* collect<T, U>(
  source: AsyncIterable<T>,
  mapping: (item: T, index: number) => Iterable<U> | AsyncIterable<U>
): AsyncIterable<U> {
  let index = 0
  for await (const item of source) {
    const children = mapping(item, index)
    for await (const child of children) {
      yield child
    }
    index++
  }
}

/**
 * Wraps the two given iterables as a single concatenated iterable.
 * @param first The first iterable.
 * @param second The second iterable.
 * @example
 * append(
 *   init({ from: 1, to: 3 }),
 *   init({ from: 8, to: 10 })
 * ) // Yields: 1, 2, 3, 8, 9, 10
 */
export async function* append<T>(
  first: AsyncIterable<T>,
  second: AsyncIterable<T>
): AsyncIterable<T> {
  for await (const item of first) {
    yield item
  }
  for await (const item of second) {
    yield item
  }
}

/**
 * Combines the given collection-of-iterables as a single concatenated iterable.
 * @param sources The input collection.
 * @example
 * concat([
 *   init({ from: 1, to: 2 }),
 *   init({ from: 4, to: 5 }),
 *   init({ from: 8, to: 9 })
 * ]) // Yields 1, 2, 4, 5, 8, 9
 */
export async function* concat<T>(
  sources: AsyncIterable<Iterable<T> | AsyncIterable<T>> | Iterable<Iterable<T> | AsyncIterable<T>>
): AsyncIterable<T> {
  for await (const source of sources) {
    for await (const item of source) {
      yield item
    }
  }
}

/**
 * Returns a iterable that contains no duplicate entries according to the equality comparisons on
 * the elements. If an element occurs multiple times in the sequence then the later occurrences are
 * discarded.
 * @param source The input collection.
 * @example
 * async function* source() {
 *   yield 'bob'
 *   yield 'cat'
 *   yield 'bob'
 *   yield 'amy'
 * }
 * distinct(source())
 * // Yields: 'bob', 'cat', 'amy'
 */
export async function* distinct<T>(source: AsyncIterable<T>): AsyncIterable<T> {
  const seen = new Set<T>()
  let index = 0
  for await (const item of source) {
    if (!seen.has(item)) {
      seen.add(item)
      yield item
    }
    index++
  }
}

/**
 * Returns a iterable that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param source The input collection.
 * @param selector A function that transforms the collection items into comparable keys.
 * @example
 * async function* source() {
 *   yield { name: 'amy', id: 1 }
 *   yield { name: 'bob', id: 2 }
 *   yield { name: 'bob', id: 3 }
 *   yield { name: 'cat', id: 3 }
 * }
 * distinctBy(source(), (x) => x.name)
 * // Yields:
 * // { name: 'amy', id: 1 }
 * // { name: 'bob', id: 2 }
 * // { name: 'cat', id: 3 }
 */
export async function* distinctBy<T, Key>(
  source: AsyncIterable<T>,
  selector: (item: T, index: number) => Key
): AsyncIterable<T> {
  const seen = new Set<Key>()
  let index = 0
  for await (const item of source) {
    const key = selector(item, index)
    if (!seen.has(key)) {
      seen.add(key)
      yield item
    }
    index++
  }
}

/**
 * Tests if any element of the collection satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test each item of the input collection.
 * @example
 * await exists(init({ from: 1, to: 3 }), (x) => x === 2)
 * // Returns: true
 *
 * await exists(init({ from: 1, to: 3 }), (x) => x === 4)
 * // Returns: false
 */
export async function exists<T>(
  source: AsyncIterable<T>,
  predicate: (item: T, index: number) => boolean
): Promise<boolean> {
  let index = 0
  for await (const item of source) {
    if (predicate(item, index)) {
      return true
    }
    index++
  }
  return false
}

/**
 * Tests if every element of the collection satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test against each item of the input collection.
 * @example
 * await every(init({ from: 1, to: 3 }), (x) => x > 0)
 * // Returns: true
 *
 * await every(init({ from: 1, to: 3 }), (x) => x < 2)
 * // Returns: false
 */
export async function every<T>(
  source: AsyncIterable<T>,
  predicate: (item: T, index: number) => boolean
): Promise<boolean> {
  let index = 0
  for await (const item of source) {
    if (!predicate(item, index)) {
      return false
    }
    index++
  }
  return true
}

/**
 * Returns the first element for which the given function returns true.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @throws If no item is found matching the criteria of the predicate.
 * @example
 * async function* source() {
 *   yield { name: 'amy', id: 1 }
 *   yield { name: 'bob', id: 2 }
 * }
 * await get(source(), (p) => p.name === 'bob')
 * // Returns: { name: 'bob', id: 2 }
 *
 * await get(source(), (p) => p.name === 'cat')
 * // Throws: Element not found matching criteria
 */
export async function get<T>(
  source: AsyncIterable<T>,
  predicate: (item: T, index: number) => boolean
): Promise<T> {
  let index = 0
  for await (const item of source) {
    if (predicate(item, index)) {
      return item
    }
    index++
  }
  throw new Error('Element not found matching criteria')
}

/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @example
 * async function* source() {
 *   yield { name: 'amy', id: 1 }
 *   yield { name: 'bob', id: 2 }
 * }
 * await find(source(), (p) => p.name === 'bob') // Returns: { name: 'bob', id: 2 }
 * await find(source(), (p) => p.name === 'cat') // Returns: undefined
 */
export async function find<T>(
  source: AsyncIterable<T>,
  predicate: (item: T, index: number) => boolean
): Promise<T | undefined> {
  let index = 0
  for await (const item of source) {
    if (predicate(item, index)) {
      return item
    }
    index++
  }
  return undefined
}

/**
 * Applies a key-generating function to each element of a collection and yields a iterable of unique
 * keys and an array of all elements that have each key.
 *
 * NOTE: Requires complete iteration of source before yielding first element.
 * @param source The input collection.
 * @param selector A function that transforms an element of the collection into a comparable key.
 * @example
 * async function* source() {
 *   yield { name: 'amy', age: 1 }
 *   yield { name: 'bob', age: 2 }
 *   yield { name: 'cat', age: 2 }
 * }
 * await groupBy(source(), (x) => x.age)
 * // Returns a Map:
 * // 1, [{ name: 'amy', age: 1 }]
 * // 2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]
 */
export async function groupBy<T, Key>(
  source: AsyncIterable<T>,
  selector: (item: T, index: number) => Key
): Promise<Map<Key, T[]>> {
  const groups = new Map<Key, T[]>()
  let index = 0
  for await (const item of source) {
    const key = selector(item, index)
    const group = groups.get(key)
    if (group === undefined) {
      groups.set(key, [item])
    } else {
      group.push(item)
    }
    index++
  }
  return groups
}

/**
 * Returns an interable of each element in the input sequence and its predecessor,
 * with the exception of the first element which is only returned as the predecessor of the second element.
 * @param source The input collection
 * @example
 * pairwise(init({ from: 1, to: 4 }))
 * // Yields: [1, 2], [2, 3], [3, 4]
 */
export async function* pairwise<T>(source: AsyncIterable<T>): AsyncIterable<[T, T]> {
  let prev: T | undefined = undefined
  let started = false
  for await (const item of source) {
    if (!started) {
      started = true
    } else {
      yield [prev!, item]
    }
    prev = item
  }
}

export interface InitRange {
  from: number
  to: number
  increment?: number
}

export interface InitCount {
  start?: number
  count: number
  increment?: number
}

/**
 * Generates a new iterable which, when iterated, will return the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @throws When the options would result in a sequence that would not complete. If this is the
 * desired behaviour, use initInfinite.
 * @example
 * initRaw(3) // Yields: 0, 1, 2
 * initRaw({ from: 2, to: 5 }) // Yields: 2, 3, 4, 5
 * initRaw({ from: 0, to: 100, increment: 25 }) // Yields: 0, 25, 50, 75, 100
 */
export async function* initRaw(options: number | InitRange | InitCount): AsyncIterable<number> {
  function normaliseOptions() {
    if (typeof options === 'number') {
      return {
        start: 0,
        count: options,
        increment: 1,
      }
    }
    if ('from' in options) {
      const sign = options.to < options.from ? -1 : 1
      if (
        options.increment !== undefined &&
        (options.increment === 0 || options.increment / sign < 0)
      ) {
        throw new Error(
          'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
        )
      }
      const increment = options.increment ? options.increment : sign
      return {
        start: options.from,
        count: Math.floor((options.to - options.from) / increment + 1),
        increment: increment,
      }
    }
    const start = options.start === undefined ? 0 : options.start
    return {
      start,
      count: options.count,
      increment: options.increment === undefined ? 1 : options.increment,
    }
  }
  const { start, count, increment } = normaliseOptions()
  let current = start
  for (let index = 0; index < count; index++) {
    yield current
    current += increment
  }
}

/**
 * Generates a new iterable which, when iterated, will return the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @example
 * initInfiniteRaw() // Yields: 0, 1, 2, ...
 * initInfiniteRaw({ start: 99 }) // Yields: 99, 100, 101 ...
 * initInfiniteRaw({ start: 1, increment: -0.5 }) // Yields: 1, 0.5, 0, -0.5, -1, ...
 */
export async function* initInfiniteRaw(options?: {
  start?: number
  increment?: number
}): AsyncIterable<number> {
  const start = options !== undefined && options.start !== undefined ? options.start : 0
  const increment = options !== undefined && options.increment !== undefined ? options.increment : 1
  for (let index = start; true; index += increment) {
    yield index
  }
}

/**
 * Returns the elements of the iterable after a specified count.
 * @param source The input collection.
 * @param count The number of items to skip.
 * @example
 * skip(init({ from: 1, to: 5}), 2)
 * // Yields: 3, 4, 5
 */
export async function* skip<T>(source: AsyncIterable<T>, count: number): AsyncIterable<T> {
  let i = 0
  for await (const item of source) {
    if (i >= count) {
      yield item
    } else {
      i++
    }
  }
}

/**
 * Returns the elements of the iterable up to a specified count.
 * @param source The input collection.
 * @param count The number of items to take.
 * @example
 * take(init({ from: 1, to: 4 }), 2)
 * // Yields: 1, 2
 */
export async function* take<T>(source: AsyncIterable<T>, count: number): AsyncIterable<T> {
  let i = 0
  for await (const item of source) {
    if (i < count) {
      i++
      yield item
    } else {
      break
    }
  }
}

/**
 * Returns the number of items in the collection.
 * @param source The input collection.
 * @example
 * await count(init(5))
 * // Returns: 5
 */
export async function count<T>(source: AsyncIterable<T>): Promise<number> {
  let length = 0
  for await (const _ of source) {
    length++
  }
  return length
}

/**
 * Returns the number of items in the collection.
 * @param source The input collection.
 * @alias count
 * @example
 * await length(init(5)) // Returns: 5
 */
export const length = count

/**
 * Yields an iterable ordered by the selected key.
 * If no selector is specified, the elements will be compared directly.
 *
 * NOTE: Requires complete iteration of source before yielding first element.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @example
 * await sort(init({ from 3, to: 1 }))
 * // Returns: [1, 2, 3]
 *
 * async function* source() {
 *   yield 'Cat'
 *   yield 'amy'
 *   yield 'BOB'
 * }
 * await sort(source(), (n) => n.toLowerCase())
 * // Returns: ['amy', 'BOB', 'Cat']
 */
export async function sort<T, Key>(
  source: AsyncIterable<T>,
  selector?: (item: T) => Key
): Promise<T[]> {
  const theSelector = selector === undefined ? (x: T) => x : selector
  const copy = await toArray(source)
  copy.sort((a: T, b: T) => {
    return theSelector(a) > theSelector(b) ? 1 : -1
  })
  return copy
}

/**
 * Yields an iterable ordered by the selected key descending.
 * If no selector is specified, the elements will be compared directly.
 *
 * NOTE: Requires complete iteration of source before yielding first element.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @example
 * await sortDescending(init({ from 1, to: 3 }))
 * // Returns: [3, 2, 1]
 *
 * async function* source() {
 *   yield 'Cat'
 *   yield 'amy'
 *   yield 'BOB'
 * }
 * await sortDescending(source(), (n) => n.toLowerCase())
 * // Returns: ['Cat', 'BOB', 'amy']
 */
export async function sortDescending<T, Key>(
  source: AsyncIterable<T>,
  selector?: (item: T) => Key
): Promise<T[]> {
  const theSelector = selector === undefined ? (x: T) => x : selector
  const copy = await toArray(source)
  copy.sort((a: T, b: T) => {
    return theSelector(a) < theSelector(b) ? 1 : -1
  })
  return copy
}

/**
 * Applies a key-generating function to each element of the collection and yields an iterable ordered by keys.
 *
 * NOTE: Requires complete iteration of source before yielding first element.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @example
 * async function* source() {
 *   yield 'Cat'
 *   yield 'amy'
 *   yield 'BOB'
 * }
 * await sortBy(source(), (n) => n.toLowerCase())
 * // Returns: ['amy', 'BOB', 'Cat']
 */
export async function sortBy<T, Key>(
  source: AsyncIterable<T>,
  selector: (item: T) => Key
): Promise<T[]> {
  const copy = await toArray(source)
  copy.sort((a: T, b: T) => {
    return selector(a) > selector(b) ? 1 : -1
  })
  return copy
}

/**
 * Applies a key-generating function to each element of the collection and yields an iterable ordered by keys, descending.
 *
 * NOTE: Requires complete iteration of source before yielding first element.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @example
 * async function* source() {
 *   yield 'Cat'
 *   yield 'amy'
 *   yield 'BOB'
 * }
 * await sortByDescending(source(), (n) => n.toLowerCase())
 * // Returns: ['Cat', 'BOB', 'amy']
 */
export async function sortByDescending<T, Key>(
  source: AsyncIterable<T>,
  selector: (item: T) => Key
): Promise<T[]> {
  const copy = await toArray(source)
  copy.sort((a: T, b: T) => {
    return selector(a) > selector(b) ? -1 : 1
  })
  return copy
}

/**
 * Yields each element of the iterable in reverse order.
 *
 * NOTE: Requires complete iteration of source before yielding first element.
 * @param source The input collection.
 * @example
 * async function* source() {
 *   yield 'cat'
 *   yield 'amy'
 *   yield 'bob'
 * }
 * await reverse(source())
 * // Returns: ['bob', 'amy', 'cat']
 */
export async function reverse<T>(source: AsyncIterable<T>): Promise<T[]> {
  const asArray = await toArray(source)
  return asArray.reverse()
}

/**
 * Returns the sum of the values in the collection.
 * @param source The input collection.
 * @example
 * await sum(init({ from: 5, to: 10 }))
 * // Returns: 45
 */
export async function sum(source: AsyncIterable<number>): Promise<number> {
  let sum = 0
  for await (const item of source) {
    sum += item
  }
  return sum
}

/**
 * Returns the sum of the values returned by the selector for each element in the collection.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 * @example
 * async function* source() {
 *   yield { name: 'amy', age: 21 }
 *   yield { name: 'bob', age: 2 }
 *   yield { name: 'cat', age: 18 }
 * }
 * await sumBy(source(), (x) => x.age)
 * // Returns: 41
 */
export async function sumBy<T>(
  source: AsyncIterable<T>,
  selector: (item: T) => number
): Promise<number> {
  let sum = 0
  for await (const item of source) {
    sum += selector(item)
  }
  return sum
}

/**
 * Returns the maximum of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * await max(init({ from: 5, to: 10 }))
 * // Returns: 10
 */
export async function max(source: AsyncIterable<number>): Promise<number> {
  let max: number | null = null
  for await (const item of source) {
    if (max === null || item > max) {
      max = item
    }
  }
  if (max === null) {
    throw new Error(`Can't find max of an empty collection`)
  }
  return max
}

/**
 * Returns the maximum of the values returned by the selector for each element in the collection.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 * @example
 * async function* source() {
 *   yield { name: 'amy', age: 21 }
 *   yield { name: 'bob', age: 2 }
 *   yield { name: 'cat', age: 18 }
 * }
 * await maxBy(source(), (x) => x.age)
 * // Returns: 21
 */
export async function maxBy<T>(
  source: AsyncIterable<T>,
  selector: (item: T) => number
): Promise<number> {
  let max: number | null = null
  for await (const item of source) {
    const value = selector(item)
    if (max === null || value > max) {
      max = value
    }
  }
  if (max === null) {
    throw new Error(`Can't find max of an empty collection`)
  }
  return max
}

/**
 * Returns the minimum of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * await min(init({ from: 5, to: 10 }))
 * // Returns: 5
 */
export async function min(source: AsyncIterable<number>): Promise<number> {
  let min: number | null = null
  for await (const item of source) {
    if (min === null || item < min) {
      min = item
    }
  }
  if (min === null) {
    throw new Error(`Can't find min of an empty collection`)
  }
  return min
}

/**
 * Returns the minimum of the values returned by the selector for each element in the collection.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 * @example
 * async function* source() {
 *   yield { name: 'amy', age: 21 }
 *   yield { name: 'bob', age: 2 }
 *   yield { name: 'cat', age: 18 }
 * }
 * await minBy(source(), (x) => x.age)
 * // Returns: 2
 */
export async function minBy<T>(
  source: AsyncIterable<T>,
  selector: (item: T) => number
): Promise<number> {
  let min: number | null = null
  for await (const item of source) {
    const value = selector(item)
    if (min === null || value < min) {
      min = value
    }
  }
  if (min === null) {
    throw new Error(`Can't find min of an empty collection`)
  }
  return min
}

/**
 * Returns the mean (average) of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * await mean(init({ from: 5, to: 10 }))
 * // Returns: 7.5
 */
export async function mean(source: AsyncIterable<number>): Promise<number> {
  let sum = 0
  let count = 0
  for await (const item of source) {
    sum += item
    count++
  }
  if (count === 0) {
    throw new Error(`Can't find mean of an empty collection`)
  }
  return sum / count
}

/**
 * Returns the mean (average) of the values returned by the selector for each element in the collection.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 * @throws If the collection is empty.
 * @example
 * async function* source() {
 *   yield { name: 'amy', age: 21 }
 *   yield { name: 'bob', age: 2 }
 *   yield { name: 'cat', age: 18 }
 *   yield { name: 'dot', age: 39 }
 * }
 * await meanBy(source(), (x) => x.age)
 * // Returns: 20
 */
export async function meanBy<T>(
  source: AsyncIterable<T>,
  selector: (item: T) => number
): Promise<number> {
  let sum = 0
  let count = 0
  for await (const item of source) {
    sum += selector(item)
    count++
  }
  if (count === 0) {
    throw new Error(`Can't find mean of an empty collection`)
  }
  return sum / count
}

export class ChainableAsyncIterable<T> implements AsyncIterable<T> {
  private source: AsyncIterable<T>
  constructor(source: AsyncIterable<T>) {
    this.source = source
  }

  [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
    return this.source[Symbol.asyncIterator]()
  }

  /**
   * Creates an array from the source iterable object.
   * @example
   * await init(3).toArray()
   * // Returns: [0, 1, 2]
   */
  toArray(): Promise<T[]> {
    return toArray(this.source)
  }

  /**
   * Creates a new iterable whose elements are the results of applying the specified mapping to each of the elements of the source collection.
   * @param mapping A function to transform items from the input collection.
   * @example
   * init({ start: 1, count: 3 })
   *   .map((x) => x * 2)
   * // Yields: 2, 4, 6
   */
  map<U>(mapping: (item: T, index: number) => U): ChainableAsyncIterable<U> {
    return new ChainableAsyncIterable(map(this.source, mapping))
  }

  /**
   * Returns a new iterable containing only the elements of the collection for which the given predicate returns true.
   * @param predicate A function to test whether each item in the input collection should be included in the output.
   * @example
   * init({ start: 1, count: 4 })
   *   .filter((x) => x % 2 === 0)
   * // Yields: 2, 4
   */
  filter(predicate: (item: T, index: number) => boolean): ChainableAsyncIterable<T> {
    return new ChainableAsyncIterable(filter(this.source, predicate))
  }

  /**
   * Applies the given function to each element of the sequence and returns a new sequence comprised of the results for each element where the function returns a value.
   * This can be thought of as doing both a filter and a map at the same time.
   * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
   * @example
   * init({ start: 1, count: 3 })
   *   .choose((x) => (x % 2 === 1 ? x * 2 : undefined))
   * // Yields: 2, 6
   */
  choose<U>(chooser: (item: T, index: number) => U | undefined): ChainableAsyncIterable<U> {
    return new ChainableAsyncIterable(choose(this.source, chooser))
  }

  /**
   * Applies the given function to each element of the source iterable and concatenates all the results.
   * @param mapping A function to transform elements of the input collection into collections that are concatenated.
   * @example
   * init({ start: 1, count: 3 }).collect(function* (x) {
   *   yield x
   *   yield x
   * }) // Yields: 1, 1, 2, 2, 3, 3
   * // You can also just return an array from your mapping function
   * init({ start: 1, count: 3 })
   *   .collect((x) => [x, x])
   */
  collect<U>(
    mapping: (item: T, index: number) => Iterable<U> | AsyncIterable<U>
  ): ChainableAsyncIterable<U> {
    return new ChainableAsyncIterable(collect(this.source, mapping))
  }

  /**
   * Wraps the two given iterables as a single concatenated iterable.
   * @param second The second iterable.
   * @example
   * init({ from: 1, to: 3 })
   *   .append(init({ from: 8, to: 10 }))
   * // Yields: 1, 2, 3, 8, 9, 10
   */
  append(second: AsyncIterable<T>): ChainableAsyncIterable<T> {
    return new ChainableAsyncIterable(append(this.source, second))
  }

  /**
   * Returns a iterable that contains no duplicate entries according to the equality comparisons on
   * the elements. If an element occurs multiple times in the sequence then the later occurrences are
   * discarded.
   * @example
   * async function* source() {
   *   yield 'bob'
   *   yield 'cat'
   *   yield 'bob'
   *   yield 'amy'
   * }
   * chain(source()).distinct()
   * // Yields: 'bob', 'cat', 'amy'
   */
  distinct(): ChainableAsyncIterable<T> {
    return new ChainableAsyncIterable(distinct(this.source))
  }

  /**
   * Returns a iterable that contains no duplicate entries according to the equality comparisons on
   * the keys returned by the given key-generating function. If an element occurs multiple times in
   * the sequence then the later occurrences are discarded.
   * @param selector A function that transforms the collection items into comparable keys.
   * @example
   * async function* source() {
   *   yield { name: 'amy', id: 1 }
   *   yield { name: 'bob', id: 2 }
   *   yield { name: 'bob', id: 3 }
   *   yield { name: 'cat', id: 3 }
   * }
   * chain(source()).distinctBy((x) => x.name)
   * // Yields:
   * // { name: 'amy', id: 1 }
   * // { name: 'bob', id: 2 }
   * // { name: 'cat', id: 3 }
   */
  distinctBy<Key>(selector: (item: T, index: number) => Key): ChainableAsyncIterable<T> {
    return new ChainableAsyncIterable(distinctBy(this.source, selector))
  }

  /**
   * Tests if any element of the collection satisfies the given predicate.
   * @param predicate A function to test each item of the input collection.
   * @example
   * await init({ from: 1, to: 3 }).exists((x) => x === 2) // Returns: true
   * await init({ from: 1, to: 3 }).exists((x) => x === 4) // Returns: false
   */
  exists(predicate: (item: T, index: number) => boolean): Promise<boolean> {
    return exists(this.source, predicate)
  }

  /**
   * Tests if every element of the collection satisfies the given predicate.
   * @param predicate A function to test against each item of the input collection.
   * @example
   * await init({ from: 1, to: 3 }).every((x) => x > 0) // Returns: true
   * await init({ from: 1, to: 3 }).every((x) => x < 2) // Returns: false
   */
  every(predicate: (item: T, index: number) => boolean): Promise<boolean> {
    return every(this.source, predicate)
  }

  /**
   * Returns the first element for which the given function returns true.
   * @param predicate A function to test whether an item in the collection should be returned.
   * @throws If no item is found matching the criteria of the predicate.
   * @example
   * async function* source() {
   *   yield { name: 'amy', id: 1 }
   *   yield { name: 'bob', id: 2 }
   * }
   * await chain(source()).get((p) => p.name === 'bob') // Returns: { name: 'bob', id: 2 }
   * await chain(source()).get((p) => p.name === 'cat') // Throws: Element not found matching criteria
   */
  get(predicate: (item: T, index: number) => boolean): Promise<T> {
    return get(this.source, predicate)
  }

  /**
   * Returns the first element for which the given function returns true, otherwise undefined.
   * @param predicate A function to test whether an item in the collection should be returned.
   * @example
   * async function* source() {
   *   yield { name: 'amy', id: 1 }
   *   yield { name: 'bob', id: 2 }
   * }
   * await chain(source()).find((p) => p.name === 'bob') // Returns: { name: 'bob', id: 2 }
   * await chain(source()).find((p) => p.name === 'cat') // Returns: undefined
   */
  find(predicate: (item: T, index: number) => boolean): Promise<T | undefined> {
    return find(this.source, predicate)
  }

  /**
   * Applies a key-generating function to each element of a collection and yields a iterable of unique
   * keys and an array of all elements that have each key.
   * @param selector A function that transforms an element of the collection into a comparable key.
   * @example
   * async function* source() {
   *   yield { name: 'amy', age: 1 }
   *   yield { name: 'bob', age: 2 }
   *   yield { name: 'cat', age: 2 }
   * }
   * await chain(source()).groupBy((x) => x.age)
   * // Returns the Map:
   * // 1, [{ name: 'amy', age: 1 }]
   * // 2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]
   */
  groupBy<Key>(selector: (item: T, index: number) => Key): Promise<Map<Key, Iterable<T>>> {
    return groupBy(this.source, selector)
  }

  /**
   * Returns an interable of each element in the input sequence and its predecessor,
   * with the exception of the first element which is only returned as the predecessor of the second element.
   * @example
   * init({ from: 1, to: 4 }).pairwise()
   * // Yields: [1, 2], [2, 3], [3, 4]
   */
  pairwise(): ChainableAsyncIterable<[T, T]> {
    return new ChainableAsyncIterable(pairwise(this.source))
  }

  /**
   * Returns the elements of the iterable after a specified count.
   * @param count The number of items to skip.
   * @example
   * init({ from: 1, to: 5}).skip(2)
   * // Yields: 3, 4, 5
   */
  skip(count: number): ChainableAsyncIterable<T> {
    return new ChainableAsyncIterable(skip(this.source, count))
  }

  /**
   * Returns the elements of the iterable up to a specified count.
   * @param count The number of items to take.
   * @example
   * init({ from: 1, to: 4 }).take(2)
   * // Yields: 1, 2
   */
  take(count: number): ChainableAsyncIterable<T> {
    return new ChainableAsyncIterable(take(this.source, count))
  }

  /**
   * Returns the number of items in the collection.
   * @example
   * await init(5).count()
   * // Returns: 5
   */
  count(): Promise<number> {
    return count(this.source)
  }

  /**
   * Returns the number of items in the collection.
   * @example
   * await init(5).length()
   * // Returns: 5
   */
  length(): Promise<number> {
    return count(this.source)
  }

  /**
   * Yields an iterable ordered by the selected key.
   * If no selector is specified, the elements will be compared directly.
   * @param selector An optional function to transform items of the input sequence into comparable keys.
   * @example
   * init({ from 3, to: 1 }).sort()
   * // Yields 1, 2, 3
   *
   * async function* source() {
   *   yield 'Cat'
   *   yield 'amy'
   *   yield 'BOB'
   * }
   * await chain(source()).sort((n) => n.toLowerCase())
   * // Returns: ['amy', 'BOB', 'Cat']
   */
  sort<Key>(selector?: (item: T) => Key): Promise<T[]> {
    return sort(this.source, selector)
  }

  /**
   * Applies a key-generating function to each element of the collection and yields an iterable ordered by keys.
   * @param selector A function to transform items of the input sequence into comparable keys.
   * @example
   * async function* source() {
   *   yield 'Cat'
   *   yield 'amy'
   *   yield 'BOB'
   * }
   * await chain(source()).sortBy((n) => n.toLowerCase())
   * // Returns: ['amy', 'BOB', 'Cat']
   */
  sortBy<Key>(selector: (item: T) => Key): Promise<T[]> {
    return sortBy(this.source, selector)
  }

  /**
   * Yields an iterable ordered by the selected key descending.
   * If no selector is specified, the elements will be compared directly.
   * @param selector An optional function to transform items of the input sequence into comparable keys.
   * @example
   * await init({ from 1, to: 3 }).sortDescending()
   * // Returns [3, 2, 1]
   *
   * async function* source() {
   *   yield 'Cat'
   *   yield 'amy'
   *   yield 'BOB'
   * }
   * await chain(source()).sortDescending((n) => n.toLowerCase())
   * // Returns: ['Cat', 'BOB', 'amy']
   */
  sortDescending<Key>(selector?: (item: T) => Key): Promise<T[]> {
    return sortDescending(this.source, selector)
  }

  /**
   * Applies a key-generating function to each element of the collection and yields an iterable ordered by keys, descending.
   * @param selector A function to transform items of the input sequence into comparable keys.
   * @example
   * async function* source() {
   *   yield 'Cat'
   *   yield 'amy'
   *   yield 'BOB'
   * }
   * await chain(source()).sortByDescending((n) => n.toLowerCase())
   * // Returns: ['Cat', 'BOB', 'amy']
   */
  sortByDescending<Key>(selector: (item: T) => Key): Promise<T[]> {
    return sortByDescending(this.source, selector)
  }

  /**
   * Yields each element of the iterable in reverse order.
   * @example
   * async function* source() {
   *   yield 'cat'
   *   yield 'amy'
   *   yield 'bob'
   * }
   * await chain(source()).reverse()
   * // Returns: ['bob', 'amy', 'cat']
   */
  reverse(): Promise<T[]> {
    return reverse(this.source)
  }

  /**
   * Returns the sum of the values returned by the selector for each element in the collection.
   * @param selector A function to transform each element into a summable value.
   * @example
   * async function* source() {
   *   yield { name: 'amy', age: 21 }
   *   yield { name: 'bob', age: 2 }
   *   yield { name: 'cat', age: 18 }
   * }
   * await chain(source()).sumBy((x) => x.age)
   * // Returns: 41
   */
  sumBy(selector: (item: T) => number): Promise<number> {
    return sumBy(this.source, selector)
  }

  /**
   * Returns the maximum of the values returned by the selector for each element in the collection.
   * @param selector A function to transform each element into a comparable value.
   * @throws If the collection is empty.
   * @example
   * async function* source() {
   *   yield { name: 'amy', age: 21 }
   *   yield { name: 'bob', age: 2 }
   *   yield { name: 'cat', age: 18 }
   * }
   * await chain(source()).maxBy((x) => x.age)
   * // Returns: 21
   */
  maxBy(selector: (item: T) => number): Promise<number> {
    return maxBy(this.source, selector)
  }

  /**
   * Returns the minimum of the values returned by the selector for each element in the collection.
   * @param selector A function to transform each element into a comparable value.
   * @throws If the collection is empty.
   * @example
   * async function* source() {
   *   yield { name: 'amy', age: 21 }
   *   yield { name: 'bob', age: 2 }
   *   yield { name: 'cat', age: 18 }
   * }
   * await chain(source()).minBy((x) => x.age)
   * // Returns: 2
   */
  minBy(selector: (item: T) => number): Promise<number> {
    return minBy(this.source, selector)
  }

  /**
   * Returns the mean (average) of the values returned by the selector for each element in the collection.
   * @param selector A function to transform each element into a summable value.
   * @throws If the collection is empty.
   * @example
   * async function* source() {
   *   yield { name: 'amy', age: 21 }
   *   yield { name: 'bob', age: 2 }
   *   yield { name: 'cat', age: 18 }
   *   yield { name: 'dot', age: 39 }
   * }
   * await chain(source()).meanBy((x) => x.age)
   * // Returns: 20
   */
  meanBy(selector: (item: T) => number): Promise<number> {
    return meanBy(this.source, selector)
  }
}

/**
 * Generates a new chainable iterable which, when iterated, will return the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @throws When the options would result in a sequence that would not complete. If this is the
 * desired behaviour, use initInfinite.
 * @example
 * init(3) // Yields: 0, 1, 2
 * init({ from: 2, to: 5 }) // Yields: 2, 3, 4, 5
 * init({ from: 0, to: 100, increment: 25 })
 * // Yields: 0, 25, 50, 75, 100
 */
export function init(options: number | InitRange | InitCount): ChainableAsyncIterable<number> {
  return new ChainableAsyncIterable(initRaw(options))
}

/**
 * Generates a new chainable iterable which, when iterated, will return the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @example
 * initInfinite() // Yields: 0, 1, 2, ...
 * initInfinite({ start: 99 }) // Yields: 99, 100, 101 ...
 * initInfinite({ start: 1, increment: -0.5 }) // Yields: 1, 0.5, 0, -0.5, -1, ...
 */
export function initInfinite(options?: {
  start?: number
  increment?: number
}): ChainableAsyncIterable<number> {
  return new ChainableAsyncIterable(initInfiniteRaw(options))
}

/**
 * Create a new chainable iterator from an existing iterable source.
 * @param source The input collection.
 * @example
 * async function* source() {
 *   yield { name: 'CAT', age: 18 }
 *   yield { name: 'Amy', age: 21 }
 *   yield { name: 'bob', age: 2 }
 * }
 * await chain(source())
 *   .filter((x) => x.age >= 18)
 *   .map((x) => x.name)
 *   .sortBy((x) => x.toLowerCase())
 *   .toArray()
 */
export function chain<T>(source: AsyncIterable<T>): ChainableAsyncIterable<T> {
  return new ChainableAsyncIterable(source)
}
