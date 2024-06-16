import React from 'react'
import './ReviewDetails.css'
import CusNavBar from '../../Components/Common/CusNavBar/CusNavBar'
import ReviewList from '../../Components/ReviewList/ReviewList'
import Footer from '../../Components/Common/Footer/Footer'

function ReviewDetails() {
  return (
    <>
    <CusNavBar/>

    <div className='review-details-wrapper'>
    <h3 className="review_heading">
          <strong>
            <em>Review Rating List</em>
          </strong>
        </h3>

    <ReviewList/>
    <Footer/>
    </div>
    </>
  )
}

export default ReviewDetails