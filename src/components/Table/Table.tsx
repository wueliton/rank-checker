import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import blue from "@material-ui/core/colors/blue";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./table.module.scss";
import { ISearchStatus } from "../../types";

const variableBlue = blue["700"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: variableBlue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function TableComponent({ keywords }: ISearchStatus) {
  return (
    <TableContainer component={Paper} className={style.TableContent}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Palavra Chave</StyledTableCell>
            <StyledTableCell align="center">Página</StyledTableCell>
            <StyledTableCell align="center">Posição</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keywords.map((word) => (
            <StyledTableRow key={word.id}>
              <StyledTableCell align="center">
                {undefined === word.status ? (
                  <CircularProgress className={style.circleProgress} />
                ) : word.status ? (
                  <CheckIcon className={style.iconStatus} color="success" />
                ) : (
                  <CloseIcon className={style.iconStatus} color="error" />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">{word.keyword}</StyledTableCell>
              <StyledTableCell align="center">
                {word.page === -1 ? " - " : word.page + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                {word.position === -1 ? " - " : word.position + 1}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
