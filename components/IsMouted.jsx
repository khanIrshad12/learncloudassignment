'use client'
import React,{useState,useEffect} from 'react'
import Dashboard from '@/components/Dashboard'
const IsMouted = () => {
    const [isMounted, setIsMounted] = useState(false);
useEffect(()=>{
    setIsMounted(true)
},[]);
if(!isMounted) return null;
  return (
    <Dashboard />
  )
}

export default IsMouted