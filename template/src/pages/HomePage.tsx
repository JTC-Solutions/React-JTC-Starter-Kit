import React from 'react'

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to JTC Starter Kit</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your React + TypeScript application is ready to go!
        </p>
      </div>
    </div>
  )
}
