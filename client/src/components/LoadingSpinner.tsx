import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-[800] bg-[#00000067]'>
        <img src="/assets/images/loading.gif" alt="Loading..." className='h-[10rem] w-[10rem]' />
    </div>
  )
}

export default LoadingSpinner;