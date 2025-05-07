import React from 'react'

function Coursetitre({page,setpage,register, errors,getvalue,setvalue}) {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-gray-500'>donner un titre au cours qu'il soit illustrativebe et descriptive.</p>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Course Title*
          </label>
          <input
            id="title"
            type="text"
            value={getvalue("title")}
            {...register('title', { required: 'Title is required'})}
            onChange={(e) => setvalue({ "title": e.target.value })}
            className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Entrer le titre de course "
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
    </div>
  )
}

export default Coursetitre