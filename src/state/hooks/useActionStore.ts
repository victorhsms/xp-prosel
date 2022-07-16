import { useRecoilValue } from 'recoil'
import { actionsStore } from '../atom'

export const useActionStore = () => {
  return useRecoilValue(actionsStore)
}
