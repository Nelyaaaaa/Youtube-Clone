import React from 'react'

const LeftNavMenu = ({ text, icon, className, action }) => {
  
  return (

    <div 
    className={"text-white text-[15px] cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " 
    + className}
    onClick={action}
    >
      <span className='text-xl mr-5'>
        {icon}
      </span>
      <div className='truncate'>
        {text}
      </div>

    </div>
  )
}

export default LeftNavMenu
