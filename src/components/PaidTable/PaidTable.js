import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Table,
    TableRow,
    TableCell,
    LinearProgress,
    TableContainer,
    TablePagination,
} from "@mui/material";

import css from './PaidTable.module.css';
import { colums } from "../../configs";
import { paidActions } from "../../store";
import { PaidTableHead, PaidTableBody } from '../../components';


const PaidTable = () => {
    const { paids, totalCount, currentPage, countOnPage, isLoading } = useSelector(state => state.paidReducer);
    const [query, setQuery] = useSearchParams({ limit: '30' });
    const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(query.get('order') || 'id');


    useEffect(() => {
            dispatch(paidActions.getAll(query));
        },
        [dispatch, query, setQuery]);


    const handleChangePage = (event, newPage) => {
        query.set('page', `${newPage + 1}`);
        query.delete('limit');
        setQuery(query);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        if (isAsc) {
            query.set('order', `-${property}`)
        } else {
            query.set('order', `${property}`)
        }

        query.delete('limit');

        setQuery(query)
    };


    const emptyRows = currentPage > 0 ? Math.max(0, (currentPage - 25) * countOnPage - paids.length) : 0;


    return(
        <Box className={css.box}>
            <TableContainer className={css.container}>
                {isLoading && <LinearProgress/>}
                <Table
                    stickyHeader
                    className={css.table}
                >
                    <PaidTableHead
                        colums={colums}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    {paids.map(paid => (
                        <PaidTableBody
                            key={paid.id}
                            paid={paid}
                            emptyRows={emptyRows}
                        />
                    ))
                    }
                    {emptyRows > 0 && (
                        <TableRow
                            style={{height: 53 * emptyRows}}
                        >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                align="right"
                component="div"
                count={totalCount}
                rowsPerPage={countOnPage}
                rowsPerPageOptions={[30]}
                page={currentPage - 1}
                onPageChange={handleChangePage}
            />
        </Box>
    );
};

export {
    PaidTable
};
