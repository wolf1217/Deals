import React ,{useEffect}from 'react'
import { AboutmeProvider } from './AbRouter';
import { Material } from './AbMaterial'
import Appbar from '../Index/Appbar';


function AbAll() {
  return (
    <AboutmeProvider>
      <Appbar />
      <Material />
    </AboutmeProvider>
  )
}
export default AbAll