import createWebStorage from "redux-persist/lib/storage/createWebStorage"

// Credit to @rokinsky: https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null)
    },
    setItem(_key, value) {
      return Promise.resolve(value)
    },
    removeItem(_key) {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage()

export default storage