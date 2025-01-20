'use client';
import React from 'react';
import { Button, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css"
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IncidentForm { 
    title: string;
    description: string;
}

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const NewIncidentPage = () => {
 const router = useRouter();
 const {register, control, handleSubmit} =  useForm<IncidentForm>();

  return (
    <form className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async (data) => { 
        await axios.post('/api/incidents', data);
        router.push('/incidents');
    }
    )}>
      <TextField.Root placeholder='Title'  {...register('title')}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render = {({ field }) => <SimpleMDE placeholder="Description" {...field} />} 
      />
      <Button>Submit a new incident</Button>
    </form>
  );
};

export default NewIncidentPage;
