'use client'

import React, { useCallback, useEffect, useState } from "react";
import userData from '../mock/users.json';
import { User } from "@/models/user";

import Table from '../components/Table';
import TableViewToolbar from "@/components/TableViewToolbar";
import SearchInput from "@/components/SearchInput";
import { filterListByString } from "@/utils/filterListByString";
import TableToolBar from "@/components/TableToolBar";

const headers: { key: keyof User | string; label: string, type: 'text' | 'action' }[] = [
  // { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'status', label: 'Status', type: 'text' },
  { key: 'action', label: '', type: 'action' },
  { key: 'delete', label: '', type: 'action' },
];

const Home = () => {
  const [rowsPerPage, setRowsPerPage] = useState<10 | 25 | 50>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [userList, setUserList] = useState<User[]>([]);
  const [chosenUserList, setChosenUserList] = useState<User[]>([]);

  const [isOpenActionWindow, setIsOpenActionWindow] = useState<User | 'all' | null>(null);
  const [isOpenFolderWindow, setIsOpenFolderWindow] = useState<boolean>(false);

  const [filterQuery, setFilterQuery] = useState<string>('');

  const handleInput = (value: string): void => {
    setFilterQuery(value);
  }

  const changePage = (page: number): void => {
    setCurrentPage(page);
  }

  const changeRowsPerPage = (amount: 10 | 25 | 50): void => {
    setRowsPerPage(amount);
  }

  const chooseItem = (item: User | null) => {
    if (item === null) {
      setChosenUserList(chosenUserList.length === userList.length ? [] : [...userList]);
    } else {
      setChosenUserList((prevChosenData) =>
        prevChosenData.includes(item)
          ? prevChosenData.filter((i) => i !== item)
          : [...prevChosenData, item]
      );
    }
  };

  const openActionWindow = (item: User | 'all' | null) => {
    setIsOpenActionWindow(item);
    setIsOpenFolderWindow(false);
  };

  const openFolderWindow = (isOpen: boolean) => {
    setIsOpenFolderWindow((prev: boolean) => isOpen || !prev);
    setIsOpenActionWindow(null);
  };

  useEffect(() => setUserList(userData), []);

  const filteredAndSlicedList = (list: User[], query: string) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return filterListByString(list, query).slice(startIndex, endIndex);
  }

  return (
    <main className="max-w-7xl flex flex-col gap-2 mx-auto my-4 text-sm">
      <h2 className="text-xl text-slate-400">Users</h2>
      <div className="flex flex-row gap-4 items-center">
        <SearchInput query={filterQuery} handleInput={handleInput} />
        <TableToolBar
          chosenData={chosenUserList}
          isOpenActionWindow={isOpenActionWindow}
          openActionWindow={openActionWindow}
          isOpenFolderWindow={isOpenFolderWindow}
          openFolderWindow={openFolderWindow}
        />
      </div>
      <Table
        data={filteredAndSlicedList(userList, filterQuery)}
        headers={headers}
        chosenData={chosenUserList}
        chooseItem={chooseItem}
        isOpenActionWindow={isOpenActionWindow}
        openActionWindow={openActionWindow}
      />
      <TableViewToolbar
        selectedAmount={chosenUserList.length}
        allItemsAmount={userList.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        changeRowsPerPage={changeRowsPerPage}
        changePage={changePage}
        dataLength={userList.length} />
    </main>
  );
};

export default Home;
