import { useContext } from 'react'
import NavigateContext from '../context/NavigateContext'

export function useAuthNavigate() {
  return useContext(NavigateContext)
}
