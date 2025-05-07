'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Coursetitre from './formcomponent/courseTitle';
import Coursedescription from './formcomponent/courseDescription';
import Reste from './formcomponent/reste';

type FormValues = {
  titre: string;
  description: string;
  categorie: string;
  thumbnail?: File;
};

export default function CourseCreationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<any>({titre:"", description:"",categorie:""});
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [page,setpage] = useState(1);
  const formtitle=["1","2","3"];
  const toggle=() :void => {
    if(page==0){
      <Coursetitre register={register} errors={errors} setpage={setpage} page={page} getvalue={getValues} setvalue={setValue}/>
    }else if(page==1){
      <Coursedescription register={register} errors={errors} setpage={setpage} page={page} getvalue={getValues} setvalue={setValue}/>
    }else <Reste register={register} errors={errors} setpage={setpage} page={page} getvalue={getValues} setvalue={setValue} thumbnailhandle={handleThumbnailChange}/>
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<FormValues>();

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('thumbnail', file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormValues):Promise<void> => {
    setIsSubmitting(true);
    setError({titre:"", description:"",categorie:""});

    // Manual validation
    if (!data.titre.trim()) {
      setError({...error,titre:'titre est obligatoire'});
      setIsSubmitting(false);
      return;
    }
    if (!data.description.trim() || data.description.length < 10) {
      setError({...error,description:'Description must be at least 10 characters'});
      setIsSubmitting(false);
      return;
    }
    if (!data.categorie.trim()) {
      setError({...error,categorie:'Category is required'});
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', data.titre);
      formData.append('description', data.description);
      formData.append('category', data.categorie);
      if (data.thumbnail) {
        formData.append('thumbnail', data.thumbnail);
      }

      const response = await fetch('/api/instructor/courses', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      router.push(`/instructor/courses/${result.courseId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (<>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      
      {error.titre && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.titre}
        </div>
      )}
      {error.titre && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.categorie}
        </div>
      )}
      {error.description && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.description}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
      <div style={background-color:"white" width : "100%"}> 
        <div style={{color:"black" , width : page==0 ? "33,3%" ? page==1 : "66,6%" : "100%" }}></div></div>
      <div className="mb-4"> {toggle()} </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/instructor/courses')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </form>
      <button onClick={curr=> setpage{curr-1}}} disabled={page==0}>prec</button> 
      <button onClick={if (page==formtitle.length-1){
        type="submit"
      } else curr=> setpage{curr+1} >{page==formtitle.length -1 ?"submit" : "suiv"}</button>

    </div></>
  );}
