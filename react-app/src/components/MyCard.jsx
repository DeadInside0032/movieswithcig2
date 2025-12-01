import React from 'react'
import { img_300 } from '../utils'

// styled import is not used yet
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const MyCard = ({backdrop_path, poster_path, title, name, overview, release_date, first_air_date, vote_average}) => {
  // Handle both movie (title, backdrop_path, release_date) and TV (name, poster_path, first_air_date)
  const displayTitle = title || name || 'Unknown'
  const displayImage = backdrop_path || poster_path
  const image = displayImage ? img_300 + displayImage : undefined
  const displayDate = release_date || first_air_date || ''

  return (
    <Card sx={{ width: 300, margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="movie">
            {displayTitle ? displayTitle.charAt(0) : '?'}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={displayTitle}
        subheader={displayDate}
      />
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

