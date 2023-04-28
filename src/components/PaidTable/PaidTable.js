import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Modal,
    Table,
    LinearProgress,
    TableContainer,
    TablePagination
} from "@mui/material";

import css from './PaidTable.module.css';
import { colums } from "../../configs";
import { paidActions } from "../../store";
import { PaidTableHead, PaidTableBody, SearchForm, Statistic } from '../../components';


const PaidTable = ({handleSnackOpen}) => {
    const { paids, statistic, totalCount, currentPage, countOnPage, isLoading, paidError } = useSelector(state => state.paidReducer);
    const [query, setQuery] = useSearchParams({limit: '30', order: '-num'});
    const dispatch = useDispatch();

    const [order, setOrder] = useState(query.get('order')?.includes('-') ? 'desc' : 'asc');
    const [orderBy, setOrderBy] = useState(query.get('order') || 'num');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(paidActions.getAll(query));
        dispatch(paidActions.getStatistic());
        },
        [dispatch, query, setQuery]);

    const handleOpen = () => setOpen(!open);

    const handleChangePage = (event, newPage) => {
        query.set('page', `${newPage + 1}`);
        query.delete('limit');
        setQuery(query);
    };

    const handleRequestSort = (event, property) => {
        setOrderBy(property);

        if (property === query.get('order') || `-${property}` === query.get('order') ) {
            if (order === 'asc') {
                setOrder('desc');
                query.set('order', `-${property}`);
            } else if (order === 'desc') {
                setOrder('asc');
                query.set('order', `${property}`);
            }
        } else {
            setOrder('desc');
            query.set('order', `-${property}`);
        }

        query.set('page', '1');
        query.delete('limit');
        setQuery(query);
    };

    return(
        <Box className={css.MainBox}>
            {isLoading && <LinearProgress sx={{position: "fixed", width: "100%"}}/>}
            <TableContainer className={css.Container}>
                <SearchForm handleOpen={handleOpen}/>
                {paidError && <div className={css.Error}>{paidError}</div>}
                <Table
                    stickyHeader
                    className={css.Table}
                >
                    <PaidTableHead
                        colums={colums}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    {paids.map(paid => (
                        <PaidTableBody
                            key={paid._id}
                            value={paid}
                            handleSnackOpen={handleSnackOpen}
                        />
                    ))}
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
            <Modal
                className={css.Modal}
                open={open}
                onClose={handleOpen}
            >
                <Box className={css.Box}>
                    <h3>Statistic by statuses</h3>
                    <Statistic statistic={statistic}/>
                </Box>
            </Modal>
        </Box>
    );
};

export {
    PaidTable
};
