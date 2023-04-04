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
                    <TableCell>№</TableCell>
                {colums.map(colum => (
                    <TableCell
                        key={colum.field}
                        padding={colum.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === colum.field && order ? order : 'asc'}
                    >
                        <TableSortLabel
                            active={orderBy === colum.field || orderBy === `-${colum.field}`}
                            direction={orderBy === colum.field ? order : 'asc'}
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