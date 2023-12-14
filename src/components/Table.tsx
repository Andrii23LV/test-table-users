import { User } from '@/models/user';
import React, { useEffect, useState } from 'react';
import ActionWindow from './ActionWindow';
import ConfirmModal from '@/shared/ConfirmModal';

interface TableProps<T> {
    data: User[];
    chosenData: User[];
    headers: { key: keyof User | string; label: string, type: 'text' | 'action' }[];
    isOpenActionWindow: User | 'all' | null;
    chooseItem: (item: User) => void;
    openActionWindow: (item: User | 'all' | null) => void;
}

const Table = function <T>({
    data,
    chosenData,
    headers,
    isOpenActionWindow,
    chooseItem,
    openActionWindow,
}: TableProps<T>) {
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [sorting, setSorting] = useState<{ column: keyof User | string; direction: 'asc' | 'desc' | 'none' }>({
        column: '',
        direction: 'none',
    });

    const [question, setQuestion] = useState<string>('');
    const [isOpenModal, setIsOpenModal] = useState<User | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const toggleSelectAll = () => {
        setSelectAll((prevSelectAll) => !prevSelectAll);

        if (!selectAll) {
            // If not selected all, choose all items from data
            data.forEach((item) => {
                if (!chosenData.includes(item)) {
                    chooseItem(item);
                }
            });
        } else {
            // If selected all, unchoose all items
            data.forEach((item) => chooseItem(item));
        }
    };

    const sortData = (column: keyof User | string) => {
        const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
        setSorting({ column, direction });

        const sortedData = [...data].sort((a, b) => {
            if (direction === 'asc') {
                return (a[column as keyof User] as any) < (b[column as keyof User] as any) ? -1 : 1;
            } else {
                return (b[column as keyof User] as any) < (a[column as keyof User] as any) ? -1 : 1;
            }
        });

        data.length = 0;
        data.push(...sortedData);
    };

    const handleClickDelete = (user: User) => {
        setQuestion(`Delete user ${user.username} ?`);
        setSelectedUser(user);

        openModal(user);
    }

    const deleteItem = (user: User) => {
        console.log(user);
    };

    const openModal = (user: User) => {
        setIsOpenModal(user);
    };

    const closeModal = () => {
        setIsOpenModal(null);
    };

    useEffect(() => {
        const allRowsChecked = data.every((item) => chosenData.includes(item));
        setSelectAll(allRowsChecked);
    }, [data, chosenData, selectAll]);

    return (
        <div>
            <table className='min-w-full rounded shadow-md sm:rounded-lg border-collapse'>
                <thead className='bg-slate-200'>
                    <tr>
                        <th className='text-left py-3 px-2 flex flex-row gap-4'>
                            <input type='checkbox' checked={selectAll} onChange={toggleSelectAll} />
                            <p className='font-normal text-xs'>Select All</p>
                        </th>
                        {headers.map((header) => (
                            <th key={header.key} className='text-left py-1 px-2 font-normal' onClick={() => {
                                if (header.type === 'action') return;
                                sortData(header.key)
                            }}>
                                {header.label.toUpperCase()}
                                {sorting.column === header.key && (
                                    <span className='ml-2 text-xs'>
                                        {sorting.direction === 'asc' ? '▲' : '▼'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 && !chosenData.includes(item) ? 'bg-slate-50' : chosenData.includes(item) ? 'bg-gray-100 border-l border-blue-300' : 'bg-white border-l border-white hover:border-blue-500'}`}
                        >
                            <td className='py-1 px-2 w-[100px]'>
                                <input
                                    type='checkbox'
                                    checked={chosenData.includes(item)}
                                    onChange={() => chooseItem(item)}
                                />
                            </td>
                            {headers.map((header) => (
                                <td
                                    key={header.key.toString()}
                                    className={`py-1 px-2 ${header.type === 'action' ? 'w-[70px]' : 'w-2/14'}`}
                                >
                                    {header.key === 'action' ? (
                                        <div className='relative'>
                                            <button
                                                onClick={() => openActionWindow(item)}
                                                className='blue_button'
                                            >
                                                Action
                                            </button>
                                            {isOpenActionWindow === item ? (
                                                <ActionWindow data={chosenData} openActionWindow={openActionWindow} />
                                            ) : null}
                                        </div>
                                    ) : (
                                        header.key === 'delete' ? (
                                            <div className='relative'>
                                                <button
                                                    onClick={() => handleClickDelete(item)}
                                                    className='red_button'
                                                >
                                                    Delete
                                                </button>
                                                {isOpenModal === item ? (
                                                    <ConfirmModal question={question} closeModal={closeModal} item={selectedUser} handler={deleteItem} />
                                                ) : null}
                                            </div>
                                        ) : (
                                            <p className={`${header.key === 'status' ? (item['status'] === 'online' ? 'bg-green-100 w-[100px] text-center text-xs rounded-xl p-1 border border-white' : 'bg-red-100 w-[100px] text-center text-xs rounded-xl p-1 border border-white') : ''}`}>
                                                {item[header.key as keyof User]}
                                            </p>
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Table;
