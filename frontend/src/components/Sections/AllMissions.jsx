import React from 'react'
import Mission from '../Cards/Mission'

const AllMissions = () => {

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Mission />
        <Mission />
        <Mission />
        <Mission />
        <Mission />
        <Mission />
        <Mission />
    </div>
  )
}

export default AllMissions