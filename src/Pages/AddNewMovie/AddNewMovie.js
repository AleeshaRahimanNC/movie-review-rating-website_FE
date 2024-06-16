import React from 'react'
import './AddNewMovie.css'
import CusNavBar from '../../Components/Common/CusNavBar/CusNavBar'
import AddMovie from '../../Components/AddMovie/AddMovie'
import Footer from '../../Components/Common/Footer/Footer'


function AddNewMovie() {
  return (
    <>
    <CusNavBar/>
    <AddMovie/>
    <Footer/>
    </>
  )
}

export default AddNewMovie