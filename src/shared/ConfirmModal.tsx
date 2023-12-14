import React from 'react';

interface ConfirmModalProps {
    question: string;
    handler: (item: any) => void;
    item: any;
    closeModal: () => void;
}


const ConfirmModal = ({ question, handler, item, closeModal }: ConfirmModalProps) => {
    const handleConfirm = (): void => {
        try {
            handler(item);
        } finally {
            closeModal();
        }
    };

    const handleCancel = (): void => {
        closeModal();
    };

    return (

        <div className="bg-gray-200 flex flex-col gap-2 shadow-2xl gray_border absolute top-full right-0 z-10" >
            <p>{question}</p>
            <div className='flex gap-2 justify-center'>
                <button onClick={handleConfirm} className="red_button">
                    Confirm
                </button>
                <button onClick={handleCancel} className="white_button">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;
