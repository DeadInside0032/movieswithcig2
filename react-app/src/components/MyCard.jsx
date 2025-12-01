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

export const MyCard = ({backdrop_path,title, overview, release_date, vote_average, name, first_air_date, poster_path}) => {
  const effectiveTitle = title || name || 'No Title'
  const effectiveDate = release_date || first_air_date || ''
  const imagePath = backdrop_path || poster_path
  const image = imagePath ? img_300 + imagePath : null
  return (
    <Card sx={{maxWidth: 345, margin: '0.5rem'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="movie">
              {effectiveTitle?.[0] ?? 'M'}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={effectiveTitle}
        subheader={effectiveDate}
      />
      {image && <CardMedia component="img" height="194" image={image} alt={title} />}
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
        <Typography sx={{ marginLeft: 'auto', paddingRight:'8px' }} variant='body2'>{vote_average}</Typography>
      </CardActions>
    </Card>
  )
}

