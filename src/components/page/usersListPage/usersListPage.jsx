import React, { useState, useEffect } from "react";
import { paginate } from "../../../util/paginate";
import Pagination from "../../common/pagination";
// import User from "./user";
import PropTypes from "prop-types";
import API from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchUsers, setSearchUsers] = useState("");
    const [professions, setProfession] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    // console.log("users", users);
    // console.log("data", data);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchUsers]);

    const handleProfessionSelect = (item) => {
        setSearchUsers("");
        setSelectedProf(item);
    };

    // console.log("selectedProf", selectedProf);

    const handleSearchUsers = ({ target }) => {
        setSelectedProf();
        // console.log(e.target.value);
        // console.log(searchUsers);
        setSearchUsers(target.value);
        // console.log(typeof target.value);
    };

    const handlePageChange = (pageIndex) => {
        // console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    // console.log("allUsers", allUsers);
    if (users) {
        // const filteredUsers = selectedProf
        const filteredUsers = searchUsers
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(searchUsers.toLowerCase())
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            ????????????????
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus arrayLength={count} />

                    {/* <label htmlFor="search">search</label> */}
                    <input
                        type="=text"
                        id="searchUsers"
                        name="searchUsers"
                        placeholder="Search..."
                        onChange={handleSearchUsers}
                        value={searchUsers}
                    />

                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
