import ContestRating from '@/components/profile/ContestRating'
import ProfileInfo from '@/components/profile/ProfileInfo'
import React from 'react'

const Profile = () => {
  return (
    <main className='flex gap-6 py-6 px-20 min-h-screen'>
     // <ProfileInfo />

      <div className='flex flex-col gap-4 rounded-xl  w-full'>
        
        <ContestRating />

        <div className='flex gap-4'>
          <div className='h-52 shadow-md rounded-xl bg-white w-full'>

          </div>
          <div className='h-52 shadow-md rounded-xl bg-white w-full'>

          </div>
        </div>

        <div className='h-52 shadow-md rounded-xl bg-white w-full'>

        </div>

        <div className='h-[80vh] shadow-md rounded-xl bg-white w-full'>

        </div>
        
      </div>
      
    </main>
  )
}

export default Profile
