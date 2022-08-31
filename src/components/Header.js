import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setVisibilityFilter } from "../redux"

export default function Header() {
  const [error, setError] = React.useState(false)
  const inputValue = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(setVisibilityFilter(e.target.value))
    e.preventDefault()
    if (e.target.value.length < 3) {
      setError(true)
    } else {
      setError(false)
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <h1>Rinat's Homework</h1>
      <TextField
        id='outlined-basic'
        value={inputValue}
        error={error}
        label='Поиск сделок'
        helperText='Минимум 3 символа'
        variant='outlined'
        onChange={handleChange}
      />
    </Box>
  )
}
