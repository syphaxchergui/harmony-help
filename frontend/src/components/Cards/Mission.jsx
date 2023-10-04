import React from "react";
import logo from "../../assets/logo-text.png";

const Mission = () => {
  return (
    <div className='bg-white rounded-xl flex flex-col items-stretch cursor-pointer hover:bg-slate-50 hover:shadow-md'>
      <img src={logo} className='h-28 p-2 w-full rounded-xl object-contain bg-white' />
      <div className='p-4'>
        <p className='text-sm text-gray-500'>
          {new Date().toLocaleDateString()}
        </p>
        <h3 className='font-medium text-xl mb-2 flex-wrap'>Repair and paint my wall</h3>
        <div className='flex items-center justify-between text-center mt-6'>
          <p className='rounded-full px-4 bg-green-100 text-green-400 font-medium'>Easy</p>
          <p className='rounded-full px-4 bg-blue-50 text-blue-300 font-medium'>🕐 3h</p>
          <p className='rounded-full px-4 bg-amber-50 text-amber-300 font-medium'>🏆 100</p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
