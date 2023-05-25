import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let store = (set) => ({
  userInf: {},
  addUserInfo: (userInfo) => set({ userInf: userInfo }),
  deleteUserInfo: () => set({ userInf: {} }),
})

store = devtools(store)
store = persist(store, { name:'userInfo'})

const useStore = create(store)

export default useStore