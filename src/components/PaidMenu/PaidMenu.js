import {Box, Collapse, TableCell, TableRow, TextField} from "@mui/material";

import css from './PaidMenu.module.css';

const PaidMenu = (props) => {
    const { open, paid } = props;

    return(
        <TableRow sx={{width: "100%"}}>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={14}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <h4>Message: {paid.msg ? paid.msg : 'Empty'}</h4>
                            {paid.utm &&
                                <div>
                                    <hr/>
                                    <h4>UTM: {paid.utm}</h4>
                                </div>
                            }
                        </div>
                        <div className={css.comments}>

                            <TextField name="comment" label="Comment" variant="outlined" sx={{width: "90%"}}/>
                        </div>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export {
    PaidMenu
};
