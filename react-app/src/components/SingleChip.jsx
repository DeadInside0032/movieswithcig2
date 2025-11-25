import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import {MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";



export const SingleChip = ({id,name,selectedGenres,setSelectedGenres}) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleClick = () => {
        setIsSelected(!isSelected)
        if(selectedGenres.indexOf(id)==-1)
                setSelectedGenres(prev=>[...prev,id])
        else
            setSelectedGenres(prev=>prev.filter(item=>item!=id))
    };



    return (
        <Stack direction="row" spacing={1} sx={{padding:'5px'}}>
            TODO use Chip for showing genre
        </Stack>
    );
}
