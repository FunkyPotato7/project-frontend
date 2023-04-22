import { TableCell, TableHead, TableRow } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";

const PaidTableHead = (props) => {
    const {colums, order, orderBy, onRequestSort} = props;

    const SortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return(
        <TableHead>
            <TableRow>
                {colums.map(colum => (
                    <TableCell
                        key={colum.field}
                        padding={colum.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === colum.field && order ? order : 'asc'}
                    >
                        <TableSortLabel
                            key={colum.field}
                            active={orderBy === '№' ? true : orderBy === colum.field || orderBy === `-${colum.field}`}
                            direction={order}
                            onClick={SortHandler(colum.field)}
                        >
                            {colum.headerName}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export {
    PaidTableHead
};