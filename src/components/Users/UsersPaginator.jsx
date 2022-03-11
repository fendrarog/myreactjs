import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUsers } from "../../redux/users-reducer";
import {
  selectPagesCount,
  selectPortionSize,
} from "../../redux/users-selectors";
import s from "./Users.module.css";

const UsersPaginator = ({ currentPage, pageSize }) => {
  const pagesCount = useSelector((state) => selectPagesCount(state));
  const portionSize = useSelector((state) => selectPortionSize(state));
  const dispatch = useDispatch();

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [portionNumber, setPortionNumber] = useState(
    Math.ceil(currentPage / portionSize)
  );
  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionSize * portionNumber;

  const onPageChange = (pageNumber) => {
    dispatch(requestUsers(pageNumber, pageSize));
  };

  return (
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(1);
          }}
        >
          Start
        </button>
      )}
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={currentPage === p && s.selectedPage}
              key={p}
              onClick={() => {
                onPageChange(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionCount);
          }}
        >
          End
        </button>
      )}
    </div>
  );
};

export default UsersPaginator;
