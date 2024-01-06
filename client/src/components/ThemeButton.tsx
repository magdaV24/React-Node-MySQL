import { Fab } from "@mui/material";
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import '../styles/components/ThemeButton.css'

export default function ThemeButton(){
    const { handle_theme } = useContext(AuthContext)
    return(
        <Fab color="primary" variant="circular" sx={{position: 'fixed', right: 10, bottom: 10}} onClick={handle_theme}>
            <PaletteOutlinedIcon sx={{fontSize: "2rem"}}/>
        </Fab>
    )
}