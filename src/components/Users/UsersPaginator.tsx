import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CombinedStateType } from "../../redux/redux-store";
import { requestUsers } from "../../redux/users-reducer";
import { selectPagesCount } from "../../redux/users-selectors";
import s from "./Users.module.css";

type PropsType = {
  currentPage: number;
  pageSize: number;
  isFriends: null | boolean;
  term?: string;
  portionNumber: number;
  portionSize: number;
  setPortionNumber: (n: number) => void;
  className?: string | false;
};

const UsersPaginator: React.FC<PropsType> = ({
  currentPage,
  pageSize,
  isFriends,
  term,
  portionNumber,
  portionSize,
  setPortionNumber,
}) => {
  const pagesCount = useSelector((state: CombinedStateType) =>
    selectPagesCount(state)
  );

  const dispatch = useDispatch();

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionSize * portionNumber;

  const onPageChange = {
    onCommonPageChange: (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize, isFriends));
    },
    onTermPageChange: (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize, isFriends, term));
    },
  };

  useEffect(() => {
    if (portionNumber > portionCount && portionCount !== 0) {
      //portionCount !== 0  Waiting loading pagesCount
      setPortionNumber(portionCount);
    }
  }, [portionCount, portionNumber, setPortionNumber]);

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
              className={currentPage === p ? s.selectedPage : undefined}
              key={p}
              onClick={() => {
                term === ""
                  ? onPageChange["onCommonPageChange"](p)
                  : onPageChange["onTermPageChange"](p);
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
