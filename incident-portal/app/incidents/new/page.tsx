import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';


const NewIncidentPage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root placeholder='Title'>
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <TextArea placeholder="Description" />
            <Button>Submit a new incident</Button>
        </div>
    )
}

export default NewIncidentPage
