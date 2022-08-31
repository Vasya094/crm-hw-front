import * as React from "react"
import axios from "axios"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useSelector } from "react-redux"
import { currentDate } from "../utils"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Tooltip } from "@mui/material"
import { TableHeader } from "./TableHeader"

export default function TableOfDeals() {
  const [deals, setDeals] = React.useState([])
  const [expandedDeal, setExpandedDeal] = React.useState("")
  const [lastQuery, setLastQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [apiError, setApiError] = React.useState(false)
  const inputValue = useSelector((state) => state.todos)

  async function fetchMyAPI(query) {
    try {
      console.trace()
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}:${
          process.env.REACT_APP_API_PORT
        }/api/leads?query=${query || ""}`
      )
      setLastQuery(query || "")
      setDeals(result.data.result)
    } catch (e) {
      console.log(e)
      setApiError(true)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    setLoading(true)
    fetchMyAPI()
  }, [])
  React.useEffect(() => {
    debugger
    if (inputValue.length >= 3) {
      setLoading(true)
      fetchMyAPI(inputValue)
    } else if (lastQuery.length > inputValue.length) {
      setLoading(true)
      fetchMyAPI()
    }
  }, [inputValue])

  const toggleExpandedDeal = (idDeal) => {
    console.log(idDeal)
    expandedDeal === idDeal ? setExpandedDeal("") : setExpandedDeal(idDeal)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHeader />
        {!loading && !apiError && (
          <TableBody>
            {deals.map((row) =>
              expandedDeal !== row.id ? (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    onClick={() => setExpandedDeal(row.id)}
                    component='th'
                    scope='row'
                  >
                    <Tooltip title='Показать контакты'>
                      <Button variant='outlined' size='small'>
                        +
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div
                        style={{ backgroundColor: row.statusInfo.color }}
                        className='status-chip-container'
                      >
                        <span className='status-chip'>
                          {row.statusInfo.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='response-user-name'>
                      <AccessibilityNewIcon />
                      <div>{row.responsibleUserName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{currentDate(row.created_at)}</TableCell>
                  <TableCell>{row.price} &#8381;</TableCell>
                </TableRow>
              ) : (
                <React.Fragment key={row.id}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      onClick={() => toggleExpandedDeal(row.id)}
                      component='th'
                      scope='row'
                    >
                      <Button variant='outlined' size='small'>
                        +
                      </Button>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div
                          style={{ backgroundColor: row.statusInfo.color }}
                          className='status-chip-container'
                        >
                          <span className='status-chip'>
                            {row.statusInfo.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='response-user-name'>
                        <AccessibilityNewIcon />
                        <div>{row.responsibleUserName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{currentDate(row.created_at)}</TableCell>
                    <TableCell>{row.price} &#8381;</TableCell>
                  </TableRow>

                  {row.contactsInfo.map((con) => (
                    <TableRow key={con.id} className='sub-row'>
                      <TableCell component='th' scope='row'></TableCell>
                      <TableCell component='th' align='right' scope='row'>
                        <div className='response-user-name cont-name-icon'>
                          <AccountCircleIcon />
                          <div>{con.name}</div>
                          <div />
                        </div>
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {!!con.contactWays.find(
                          (itm) => itm.field_code === "EMAIL"
                        ) && (
                          <a href={`mailto:${con.value}`}>
                            <AlternateEmailIcon />
                          </a>
                        )}
                        {!!con.contactWays.find(
                          (itm) => itm.field_code === "PHONE"
                        ) && (
                          <a href={`tel:${con.value}`}>
                            <LocalPhoneIcon />
                          </a>
                        )}
                      </TableCell>
                      <TableCell component='th' scope='row'></TableCell>
                      <TableCell component='th' scope='row'></TableCell>
                      <TableCell component='th' scope='row'></TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              )
            )}
          </TableBody>
        )}
      </Table>
      {loading && (
        <div>
          <div className='info-message'>
            <span>Пожалуйста ожидайте...</span>
          </div>
        </div>
      )}
      {apiError && (
        <div>
          <div className='info-message'>
            <span>Что-то пошло не так, перезагрузите страницу</span>
          </div>
        </div>
      )}
    </TableContainer>
  )
}
