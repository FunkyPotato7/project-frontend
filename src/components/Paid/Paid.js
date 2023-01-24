import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';

import { colums } from "../../configs"
import { paidActions } from "../../store";


const Paid = () => {
    const { paid, totalCount, currentPage } = useSelector(state => state.paidReducer);
    const [query, setQuery] = useSearchParams({ limit: '30' });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(paidActions.getAll(query));
    },
        [dispatch, query, setQuery]);


    return(
        <DataGrid
            rows={paid}
            columns={colums}
            rowCount={totalCount}
            disableSelectionOnClick
            disableColumnMenu={true}
            rowsPerPageOptions={[+query.get('limit')]}
            rowHeight={50}
            page={currentPage - 1}
            pageSize={30}
            paginationMode={'server'}
            onPageChange={(page) => setQuery(prev => ({page: page + 1}))}
            sx={{position: 'relative', width: '100%', bottom: 0}}
        />
    );
};

export {
    Paid
};
