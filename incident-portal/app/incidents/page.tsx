import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link';

const IncidentsPage = () => {
  return (
    <div><Button><Link href='/incidents/new'>New Incident</Link></Button></div>
  )
}

export default IncidentsPage
