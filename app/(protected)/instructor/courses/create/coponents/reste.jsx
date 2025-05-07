import React from 'react'

function Reste({page,setpage,register, errors}) {
  return (
    <>
    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categorie
          </label>
          <select
            id="category"
            value={getvalue("categoie")}
            onChange={(e) => setvalue({ "categorie": e.target.value })}
            {...register('categorie', { required: 'Categorie est obligatoire' })}
            className={`w-full px-3 py-2 border rounded-md ${errors.categorie ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a category</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="business">Business</option>
            <option value="design">Design</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.categorie.message}</p>
          )}
           <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail Image
          </label>
          <input 
            id="thumbnail"
            type="file"
            
            onChange={handleThumbnailChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {thumbnailPreview && (
            <div className="mt-4">
              <img 
                src={thumbnailPreview} 
                alt="Thumbnail preview" 
                className="h-40 w-auto object-cover rounded-md"
              />
            </div>
          )}
    </>
  )
}

export default Reste