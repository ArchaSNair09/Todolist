import React from 'react';
import { IoMdClose } from "react-icons/io";

import Button from './Button';

const Modal = ({ title, children, onClose, onSave }) => {
    return (
        <div className='modal flex items-center justify-center'>
            <div className='bg-white w-96 p-8 shadow-xl rounded-lg'>
                <div className='flex items-center justify-between'>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <IoMdClose className='cursor-pointer' onClick={() => onClose()} />
                </div>
                <form>
                    {children}
                    <Button className='h-10 text-xs px-6' label='Save' onClick={() => onSave()} />
                </form>
            </div>
        </div>
    );
};

export default Modal;