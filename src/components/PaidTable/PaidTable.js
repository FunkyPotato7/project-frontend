import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Table,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableCell,
    LinearProgress,
} from "@mui/material";

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


    // const descendingComparator = (a, b, orderBy) => {
    //     if (b[orderBy] < a[orderBy]) {
    //         return -1;
    //     }
    //     if (b[orderBy] > a[orderBy]) {
    //         return 1;
    //     }
    //     return 0;
    // }
    //
    // const getComparator = (order, orderBy) => {
    //     return order === 'desc'
    //         ? (a, b) => descendingComparator(a, b, orderBy)
    //         : (a, b) => -descendingComparator(a, b, orderBy);
    // }
    //
    // const stableSort = (array, comparator) => {
    //     const stabilizedThis = array.map((el, index) => [el, index]);
    //     stabilizedThis.sort((a, b) => {
    //         const order = comparator(a[0], b[0]);
    //         if (order !== 0) {
    //             return order;
    //         }
    //         return a[1] - b[1];
    //     });
    //     return stabilizedThis.map((el) => el[0]);
    // }

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
        <Box sx={{position: 'relative', overflow: 'hidden', maxHeight: '87.4%'}}>
            {isLoading && <LinearProgress/>}
            <TableContainer sx={{maxHeight: '94%'}}>
                <Table
                    stickyHeader
                    sx={{ minWidth: 750 }}
                    aria-label="simple table"
                >
                    <PaidTableHead
                        colums={colums}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    {/*{stableSort(paids, getComparator(order, orderBy))*/}
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
            <TableFooter sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <TableRow>
                    <TablePagination
                        align="right"
                        count={totalCount}
                        rowsPerPage={countOnPage}
                        rowsPerPageOptions={[30]}
                        page={currentPage - 1}
                        onPageChange={handleChangePage}
                    />
                </TableRow>
            </TableFooter>
        </Box>
    );
};

export {
    PaidTable
};
