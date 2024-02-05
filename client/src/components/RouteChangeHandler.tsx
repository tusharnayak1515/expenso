"use client";

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const RouteChangeHandler = () => {
    const pathName = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        console.log("pathName: ",pathName);
        setIsLoading(true);

        setTimeout(()=> {
            setIsLoading(false);
        }, 1500);

    }, [pathName]);

  return (
    <>
        {isLoading && <LoadingSpinner />}
    </>
  )
}

export default RouteChangeHandler;