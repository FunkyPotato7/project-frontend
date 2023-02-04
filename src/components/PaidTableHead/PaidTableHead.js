import { TableCell, TableHead, TableRow } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";

const PaidTableHead = (props) => {
    const {colums, order, orderBy, onRequestSort} = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return(
        <TableHead>
            <TableRow>
                {colums.map(colum => (
                    <TableCell
                        key={colum.field}
                        padding={colum.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === colum.field ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === colum.field}
                            direction={orderBy === colum.field ? order : 'asc'}
                            onClick={createSortHandler(colum.field)}
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