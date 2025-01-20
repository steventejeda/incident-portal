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
import { zodResolver } from '@hookform/resolvers/zod';
import { createIncidentSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

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
    const [isSubmitting, setSubmitting] = useState(false);

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
                        setSubmitting(true);
                        await axios.post('/api/incidents', data);
                        router.push('/incidents');
                    }
                    catch {
                        setSubmitting(false);
                        setError('An unexpected error occurred');
                    }
                }
                )}>
                <TextField.Root placeholder='Title'  {...register('title')}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={isSubmitting}>Submit a new incident {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    );
};

export default NewIncidentPage;
