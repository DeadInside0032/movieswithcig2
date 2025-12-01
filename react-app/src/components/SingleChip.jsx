import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import {MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";



export const SingleChip = ({id,name,selectedGenres,setSelectedGenres, setPage}) => {
    const [isSelected, setIsSelected] = useState(() => selectedGenres?.indexOf(id) !== -1)

    const handleClick = () => {
        setIsSelected(!isSelected)
        if (setSelectedGenres) {
            if(selectedGenres.indexOf(id)==-1)
                    setSelectedGenres(prev=>[...prev,id])
            else
                setSelectedGenres(prev=>prev.filter(item=>item!=id))
        }
    };



    // keep local selection in sync with parent selectedGenres
    React.useEffect(()=>{
        setIsSelected(selectedGenres.indexOf(id)!==-1)
    },[selectedGenres,id])

    return (
        <Stack direction="row" spacing={1} sx={{padding:'5px'}}>
            <Chip
                icon={isSelected ? <MdOutlineRadioButtonChecked/> : <MdOutlineRadioButtonUnchecked/>}
                label={name}
                color={isSelected ? 'primary' : 'default'}
                clickable
                onClick={handleClick}
            />
        </Stack>
    );
}
