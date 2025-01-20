'use client';
import dynamic from "next/dynamic";
import IncidentFormSkeleton from "./loading";

const IncidentForm = dynamic(
  () => import('@/app/incidents/components/IncidentForm'),
  { 
    ssr: false,
    loading: () => <IncidentFormSkeleton />
  }
);

const NewIssuePage = () => {
  return (
    <IncidentForm />
  )
}

export default NewIssuePage