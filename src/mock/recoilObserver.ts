import { useEffect } from 'react'
import { RecoilState, useRecoilValue } from 'recoil'

export const RecoilObserver = ({
  node,
  onChange
}: {
  node: RecoilState<any>
  onChange: any
}) => {
  const value = useRecoilValue(node)
  useEffect(() => onChange(value), [onChange, value])
  return null
}
