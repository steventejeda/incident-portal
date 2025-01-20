'use client';
import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
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
    const { register, control, handleSubmit } = useForm<IncidentForm>();
    const [error, setError] = useState('');

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}

            <form
                className='max-w-xl space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/incidents', data);
                        router.push('/incidents');
                    }
                    catch {
                        setError('An unexpected error occurred');
                    }
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
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <Button>Submit a new incident</Button>
            </form>
        </div>
    );
};

export default NewIncidentPage;
