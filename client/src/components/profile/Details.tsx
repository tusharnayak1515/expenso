"use client"

import React from 'react';
import {useSelector, shallowEqual} from "react-redux";

const Details = () => {
    const { profile } = useSelector(
        (state: any) => state.userReducer,
        shallowEqual
      );


  return (
    <div>
        <h1>My Profile</h1>
        <p>{profile?.name}</p>
    </div>
  )
}

export default Details