// LoadingButton.tsx
import React, {useState} from 'react';

const SpinnerComponent: React.FC = () => {
    return (
        <button
            type="button"
            className="bg-primaryColorOpacity text-primaryColor font-semibold py-2 px-4 rounded inline-flex items-center cursor-not-allowed"
            disabled
        >
            <svg
                className="animate-spin h-5 w-5 mr-3 text-primaryColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M12 0a12 12 0 0112 12h-4a8 8 0 00-8-8V0z"
                />
            </svg>

            Loading...
        </button>
    );
};


export default SpinnerComponent;
