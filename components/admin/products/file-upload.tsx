import { FileIcon, ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

/* import 'react-dropzone-uploader/dist/styles.css'
 */
import axios from 'axios'
import { Button } from '@/components/ui/button'

type Props = {
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ onChange, value }: Props) => {
  const type = value?.split('.').pop()


  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={() => onChange('')}
          variant="ghost"
          type="button"
        >
          <X className="h-4 w-4" />
          Remove Image
        </Button>
      </div>
    )
  }
  return (
    <>
    
    

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    
    <label className="relative aspect-square border-2 border-dashed rounded-lg hover:border-primary/50 cursor-pointer">
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
      <ImagePlus className="h-8 w-8" />
      <span className="text-xs">Upload Image</span>
    </div>
      
    <input
      type="file"
      className="hidden"
      onChange={async (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      
      formData.append('name', files[0].name);
      formData.append('type', files[0].type);
      try {
        const response = await axios.post<{ link: string }>('/upload', formData, {
          headers: {
        'Content-Type': 'multipart/form-data',
          },
        });
        onChange(response.data.link);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
        }
      }}
      accept="image/*,audio/*,video/*,application/pdf,image/svg+xml"
     /*  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer" */
    />
   </label>
   </div> 
    </>
    
  )
}

export default FileUpload
