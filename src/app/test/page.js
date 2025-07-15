"use client"
import { useLevelInfo } from '@/hooks/useLevelInfo'
import axios from 'axios'
import React, { useEffect } from 'react'

const page = () => {

    const { getLevelData, initailze } = useLevelInfo({})


    useEffect(() => {
        if (initailze === "NOTINITIALIZED") return;
        const data = getLevelData(1)
        console.log('data', data)
    }, [initailze])

    const submitForm = async () => {
        const response = await fetch("/api/newsletter", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Make sure the content type is JSON
            },
            body: JSON.stringify({
                name: 'John Doe2',
                email: 'john@example.com2',
                message: 'Hello, I need help!2',
            }),
        });

        const data = await response.json();
        console.log(data);
    };





    return (
        <div>
            <button onClick={submitForm}>test</button>
        </div>
    )
}

export default page