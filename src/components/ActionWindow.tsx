'use client';

import { User } from "@/models/user";
import React, { useEffect, useRef } from "react";

interface ActiveWindowProps {
    data: User | User[];
    openActionWindow: (item: User | 'all' | null) => void;
}

const title = 'Profile Management';

const ActionWindow = ({ data, openActionWindow }: ActiveWindowProps) => {
    const actionItems = [
        {
            label: "Profile",
            functionName: "function1",
            icon: "/path/to/icon1.png",
            shortcut: "Control + Q",
            type: "modal",
        },
        {
            label: "My channels",
            functionName: "function2",
            icon: "/path/to/icon2.png",
            shortcut: "Control + W",
            type: "modal",
        },
        {
            label: "Write a message",
            functionName: "function3",
            icon: "/path/to/icon3.png",
            shortcut: "Control + E",
            type: "modal",
        },
        {
            label: "Search",
            functionName: "function4",
            icon: "/path/to/icon4.png",
            shortcut: "Control + R",
            type: "modal",
        },
        {
            label: "Subscription",
            functionName: "function5",
            icon: "/path/to/icon4.png",
            shortcut: "Control + T",
            type: "modal",
        },
        {
            label: "Inviter",
            functionName: "function6",
            icon: "/path/to/icon4.png",
            shortcut: "Control + Y",
            type: "modal",
        },
        {
            label: "Settings",
            functionName: "function7",
            icon: "/path/to/icon4.png",
            shortcut: "Control + U",
            type: "modal",
        },
        {
            label: "Keyboard shortcuts",
            functionName: "function8",
            icon: "/path/to/icon4.png",
            shortcut: "Control + I",
            type: "modal",
        },
        {
            label: "Log out",
            functionName: "function9",
            icon: "/path/to/icon4.png",
            shortcut: "Control + O",
            type: "link",
        },
    ];

    const handleItemClick = (functionName: string) => {
        console.log(functionName);
    };

    const windowRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (windowRef.current && !(windowRef.current as Node).contains(event.target as Node)) {
                openActionWindow(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openActionWindow]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if the pressed key matches any of the shortcuts

            console.log(event.key);

            const matchingItem = actionItems.find(item => {
                const keys = item.shortcut.split(' + ');
                const pressedKeys = keys.map(key => key.toLowerCase());

                return pressedKeys.every(key => event.key.toLowerCase() === key);
            });

            // If a matching item is found, trigger the corresponding function
            if (matchingItem) {
                handleItemClick(matchingItem.functionName);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); //TBD

    return (
        <div
            className='absolute top-full right-0 bg-white border border-gray-300 rounded shadow z-10 flex flex-col w-60'
            ref={windowRef}
        >
            <div className="border-b border-b-gray-300 text-center text-gray-500 py-1"><span>{title}</span></div>
            {actionItems.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleItemClick(item.functionName)}
                    className={`flex flex-row justify-between items-center py-1 px-2 ${index % 3 === 2 && index !== actionItems.length - 1 ? 'border-b border-gray-300' : ''} hover:bg-slate-100 transition-all duration-300`}
                >
                    {/* <img src={item.icon} alt={item.label} /> */}
                    <span>{item.label}</span>
                    <span className="text-xs">{item.shortcut}</span>
                </div>
            ))}
        </div>

    );
};

export default ActionWindow;
