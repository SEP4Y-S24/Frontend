import React from 'react';

interface SwitcherProps {
    isChecked: boolean;
    onChange: () => void;
}

const Switcher: React.FC<SwitcherProps> = ({ isChecked, onChange }) => {

    return (
        <>
            <label className='flex cursor-pointer select-none items-center'>
                <div className='relative'>
                    <input
                        type='checkbox'
                        checked={isChecked}
                        onChange={onChange}
                        className='sr-only'
                    />
                    <div className='block h-8 w-14 rounded-full bg-[#E5E7EB]'/>
                    <div
    className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
        isChecked ? 'translate-x-full bg-primaryColor' : ''
    }`}
    style={isChecked ? {backgroundColor: '#4CAF50'} : {}}
    />
                </div>
            </label>
        </>
    );
};

export default Switcher;
