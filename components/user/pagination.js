/* eslint-disable @next/next/no-css-tags */
import React from "react";
import _ from "lodash";
import styles from "../styles/Pagination.module.css";
import Head from "next/head";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(items / pageSize);
  if (pageCount === 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div>
      <nav>
        <ul className={styles.pagination}>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? styles.pageItemActive : styles.pageItem
              }
            >
              <a onClick={() => onPageChange(page)} className={styles.pageLink}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;