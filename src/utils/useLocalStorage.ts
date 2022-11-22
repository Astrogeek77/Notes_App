// uselocalStrorage custum hook for storing notedata locally
import { useEffect, useState } from "react"

// using local storage for notes and cooresponding tags
// we can pass a initialValue or a function that returns a type T.
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    // get the JSON value from storage
    const jsonValue = localStorage.getItem(key)

    // check if its null 
    if (jsonValue == null) {
      // next run if the typr is of a function
      if (typeof initialValue === "function") {
        // below code won't work because typescript doesn't know type of initialValue.
        // return initialValue()

        // we run it as a function which returns a type T
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    } else {
      // if not null, parse the value
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    // save a item to local storage everytime there is a change in [value or key]
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  // return values with type
  return [value, setValue] as [T, typeof setValue]
}
