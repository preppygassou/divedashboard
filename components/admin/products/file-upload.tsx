import { FileIcon, ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import axios from 'axios'
import { Button } from '@/components/ui/button'
import { submitDeleteImageAction } from '@/actions/upload'
import Loading from '@/components/global/loading'

type Props = {
  onChange: (data:any) => void
  value?: string
  data?: any
}

const FileUpload = ({ onChange, value,data }: Props) => {
  const type = value?.split('.').pop()
  const [loading, setLoading] = useState<boolean>(false);
  


  const handlerDeleteImageAction = async () => {
    setLoading(true);
    try {
      await submitDeleteImageAction(data?.key);
      onChange("");
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
    } finally {
      setLoading(false);
    }
  }

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="image téléchargée"
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
              Voir PDF
            </a>
          </div>
        )}
        <Button
          onClick={handlerDeleteImageAction}
          variant="ghost"
          type="button"
          disabled={loading}
        >
          <X className="h-4 w-4" />
          Supprimer l'image
          {loading && <Loading />}
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
          <span className="text-xs">Télécharger l'image</span>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={async (e) => {
            setLoading(true)
            const files = e.target.files;
            if (files && files.length > 0) {
              const formData = new FormData();
              for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
              }
              /* formData.append('name', files[0].name);
              formData.append('type', files[0].type); */
              try {
                const response = await axios.post<{ url: string }>('/api/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                onChange(response.data);
                setLoading(false);
              } catch (error) {
                setLoading(false);
                console.error('Erreur lors du téléchargement du fichier:', error);
              }
            }
          }}
          accept="image/*,audio/*,video/*,application/pdf,image/svg+xml"
        />
      </label>
    </div>
    </>
  )
}

export default FileUpload
