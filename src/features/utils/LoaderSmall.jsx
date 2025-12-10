import React from 'react'

export const LoaderSmallScreen = () => {
    return (
        <div className="weatherItem flex w-100 m-w-50 l-w-33">
            <div className="fadeInFromLeft w-100 flex jc-center ai-center">
                <img src="wind-toy.svg" alt="loading"/>
            </div>
        </div>
        
    )
}