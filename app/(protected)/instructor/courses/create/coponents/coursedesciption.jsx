import React from 'react'

function Cousedescription({page,setpage,register, errors setvalue,getvalue}) {
  return (
    <>
     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            rows={5}
            value={getvalue("description")}
            onChange={(e) =>  setvalue("description": e.target.value)  })}
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description doit etre d\'au moins 10 caractères',
              }
            })}
            className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Describe your course in detail"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
    </>
  )
}

export default Cousedescription