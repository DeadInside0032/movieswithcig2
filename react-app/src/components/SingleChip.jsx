import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import {MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";



export const SingleChip = ({id,name,selectedGenres,setSelectedGenres, setPage}) => {
    const [isSelected, setIsSelected] = useState(() => selectedGenres?.indexOf(id) !== -1)

    const handleClick = () => {
        const newState = !isSelected
        setIsSelected(newState)
        if (newState) {
            setSelectedGenres(prev => Array.from(new Set([...(prev || []), id])))
        } else {
            setSelectedGenres(prev => (prev || []).filter(item => item !== id))
        }
        if(setPage) setPage(1)
    };



    React.useEffect(()=>{
        setIsSelected(selectedGenres?.indexOf(id)!==-1)
    },[selectedGenres,id])

    return (
        <Stack direction="row" spacing={1} sx={{padding:'5px'}}>
            <Chip
                label={name}
                clickable
                onClick={handleClick}
                variant={isSelected? 'filled':'outlined'}
                color={isSelected? 'primary':'default'}
                icon={isSelected? <MdOutlineRadioButtonChecked/> : <MdOutlineRadioButtonUnchecked/>}
            />
        </Stack>
    );
}
