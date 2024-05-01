import { LRRouter } from '../LRRouter';
import { TakePostProvider } from './AllApi/IndexAPI'




import { CategoryProvider } from './CategoryContext'

function ALLtest() {
  return (
    <CategoryProvider>
      <TakePostProvider>
          <LRRouter />
      </TakePostProvider>
    </CategoryProvider>
  )
}

export default ALLtest
