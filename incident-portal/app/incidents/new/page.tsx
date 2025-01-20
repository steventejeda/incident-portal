'use client';
import React, { useState } from 'react';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css"
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIncidentSchema } from '@/app/validationSchemas';
import { z } from 'zod';

type IncidentForm = z.infer<typeof createIncidentSchema>;

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
});

const NewIncidentPage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IncidentForm>({
        resolver: zodResolver(createIncidentSchema)
    });
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
                {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (<SimpleMDE placeholder="Description" {...field} />

                    )}
                />
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
                <Button>Submit a new incident</Button>
            </form>
        </div>
    );
};

export default NewIncidentPage;
