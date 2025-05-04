"use client"

import { FormEvent, useState } from "react"

export default function BlogPageForm(){

    const [searchTerm,setSearchTerm] = useState("")

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    
    return (
        <form onSubmit={handleSearch} className="relative">
            <input
                type="text"
                placeholder="Enter search keywords here"
                className="w-full p-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-800/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    )
}