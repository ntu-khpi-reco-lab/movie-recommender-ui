import React from 'react';
import styles from './Pagination.module.scss';
import leftArrow from '/src/assets/icons/arrow_left.svg';
import rightArrow from '/src/assets/icons/arrow_right.svg';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
	return (
		<div className={styles.pagination}>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={styles.arrowButton}
			>
				<img src={leftArrow} alt='Previous Page' />
			</button>
			<span className={styles.pageIndicator}>Page {currentPage}</span>
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={styles.arrowButton}
			>
				<img src={rightArrow} alt='Next Page' />
			</button>
		</div>
	);
};

export { Pagination };
