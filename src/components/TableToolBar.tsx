import { User } from "@/models/user";
import React, { useEffect, useState } from "react";
import FolderWindow from "./FolderWindow";
import ActionWindow from "./ActionWindow";
import ConfirmModal from "@/shared/ConfirmModal";

interface TableToolBarProps {
    chosenData: User[];
    chooseItem?: (item: User) => void;
    isOpenFolderWindow: boolean;
    openFolderWindow: (isOpen: boolean) => void;
    isOpenActionWindow: User | 'all' | null;
    openActionWindow: (item: User | 'all' | null) => void;
}

const TableToolBar = ({ chosenData, isOpenFolderWindow, chooseItem, openFolderWindow, isOpenActionWindow, openActionWindow, }: TableToolBarProps) => {
    const [question, setQuestion] = useState<string>('');
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<User[] | []>([]);

    const handleClickDelete = (users: User[] | []) => {
        setQuestion(`Delete ${chosenData.length} user(-s)?`);
        setSelectedUsers(users);

        openModal();
    }

    const deleteItem = (users: User[] | []) => {
        console.log(users);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    // useEffect(() => {
    //     closeModal();
    // }, [isOpenFolderWindow, isOpenActionWindow])
    return (
        <React.Fragment>
            <div className="flex flex-row justify-center items-center gap-4 py-2">
                <div className="bg-slate-200 p-2 rounded flex items-center gap-2">
                    <p className="pr-2 border-r border-slate-300 text-slate-400">Channels</p>
                    <button className="red_button_rounded">Clear Channels</button>
                    <button className="white_button_rounded">Get Channels</button>
                </div>
                <div className="relative bg-slate-200 p-2 rounded flex items-center gap-2">
                    <p className="pr-2 border-r border-gray-300 text-slate-400">User Actions</p>
                    <button className={`blue_button_rounded ${chosenData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!chosenData.length} onClick={() => openActionWindow('all')}>Action</button>
                    {isOpenActionWindow === 'all' ? (
                        <ActionWindow data={chosenData} openActionWindow={openActionWindow} />
                    ) : null}
                    <button onClick={() => handleClickDelete(chosenData)} className={`red_button_rounded ${chosenData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!chosenData.length}>{chosenData.length ? chosenData.length : ''} Delete</button>
                    {isOpenModal ? (
                        <ConfirmModal question={question} closeModal={closeModal} item={selectedUsers} handler={deleteItem} />
                    ) : null}
                </div>
                <div className="relative bg-slate-200 p-2 rounded flex items-center gap-2">
                    <p className="pr-2 border-r border-gray-300 text-slate-400">Tools</p>
                    <button className="white_button_rounded" >View</button>
                    <button className="white_button_rounded" onClick={() => openFolderWindow(true)}>Folder</button>
                    {isOpenFolderWindow ? (
                        <FolderWindow openFolderWindow={openFolderWindow} />
                    ) : null}
                </div>
            </div >
        </React.Fragment>
    );
};

export default TableToolBar;
