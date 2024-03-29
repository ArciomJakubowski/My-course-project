import React, { useState, useEffect } from "react";
import { paginate } from "../../../util/paginate";
import Pagination from "../../common/pagination";
// import { useUser } from "../../../hooks/useUsers";
import PropTypes from "prop-types";
// import API from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
// import { useProfessions } from "../../../hooks/useProfession";
// import { useAuth } from "../../../hooks/useAuth";
import {
    getProfession,
    getProfessionLoadingStatus
} from "../../../store/profession";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    // const { users } = useUser();
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());
    // const { currentUser } = useAuth();
    // const { isLoading: professionsLoading, professions } = useProfessions();
    const professions = useSelector(getProfession());
    const professionsLoading = useSelector(getProfessionLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedProf, setSelectedProf] = useState();
    const [searchUsers, setSearchUsers] = useState("");
    // const [professions, setProfession] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    // const [users, setUsers] = useState();

    // useEffect(() => {
    //     API.users.fetchAll().then((data) => setUsers(data));
    // }, []);

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        // setUsers((prevState) =>
        //     prevState.map((user) =>
        //         user._id === id ? { ...user, bookmark: !user.bookmark } : user
        //     )
        // );
        // const newArray = users.map((user) => {
        //     if (user._id === id) {
        //         return { ...user, bookmark: !user.bookmark };
        //     }
        //     return user;
        // });
        // // setUsers(newArray)
    };

    // useEffect(() => {
    //     API.professions.fetchAll().then((data) => setProfession(data));
    // }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchUsers]);

    const handleProfessionSelect = (item) => {
        if (searchUsers !== "") setSearchUsers("");
        setSelectedProf(item);
    };

    const handleSearchUsers = ({ target }) => {
        setSelectedProf(undefined);
        setSearchUsers(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        // const filteredUsers = selectedProf

        function filterUsers(data) {
            const filteredUsers = searchUsers
                ? data.filter((user) =>
                      user.name
                          .toLowerCase()
                          .includes(searchUsers.toLowerCase())
                  )
                : selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUserId);
        }

        const filteredUsers = filterUsers(users);

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
                {professions && professionsLoading && (
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
                            Очистить
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
