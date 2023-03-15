import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileDownload from "js-file-download";
import {
    Box,
    Modal,
    Table,
    Button,
    LinearProgress,
    TableContainer,
    TablePagination
} from "@mui/material";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';

import css from './PaidTable.module.css';
import { colums } from "../../configs";
import { paidActions } from "../../store";
import { paidService } from "../../services";
import { PaidTableHead, PaidTableBody, SearchFields, Statistic } from '../../components';


const PaidTable = ({handleSnackOpen}) => {
    const { paids, statistic, totalCount, currentPage, countOnPage, isLoading } = useSelector(state => state.paidReducer);
    const [query, setQuery] = useSearchParams({limit: '30'});
    const dispatch = useDispatch();

    const [order, setOrder] = useState('');
    const [orderBy, setOrderBy] = useState(query.get('order') || 'id');
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

        if (order === '') {
            setOrder('desc');
            query.set('order', `-${property}`);
        } else if (order === 'desc') {
            setOrder('asc');
            query.set('order', `${property}`);
        } else {
            setOrder('');
            setOrderBy(null);
            query.delete('order');
        }

        query.delete('limit');
        setQuery(query);
    };

    const download = async () => {
        const response = await paidService.export(query);
        FileDownload(response.data, "paid.xlsx");
    };


    return(
        <Box className={css.MainBox}>
            {isLoading && <LinearProgress/>}
            <TableContainer className={css.Container}>
                <Box className={css.NavBar}>
                    <SearchFields/>
                    <div>
                        <Button onClick={handleOpen}><AssessmentTwoToneIcon/></Button>
                        <Button onClick={download}><FileDownloadTwoToneIcon/></Button>
                    </div>
                </Box>
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
                            key={paid.id}
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
