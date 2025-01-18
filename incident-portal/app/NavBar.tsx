import Link from 'next/link'
import React from 'react'
import { LuMailWarning } from "react-icons/lu";

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' }, 
        { label: 'Incidents', href: '/incidents' }, 
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><LuMailWarning /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => <Link 
        key={link.href} 
        className='text-zinc-500 hover:text-zinc-800 transtion-colors' 
        href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
