import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'

import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'

import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ShareIcon from '@material-ui/icons/Share'

class NewsFeedPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = { expended: false }
    }

    render() {
        return (
            <Card className="post-card">
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            src="https://res.cloudinary.com/dhrg9zqj4/image/upload/v1562563952/users/sebastian_an3edm.png"
                        />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Charlotte Karlsen"
                    subheader="25 May 2019"
                />
                <CardMedia
                    image="https://res.cloudinary.com/dhrg9zqj4/image/upload/v1561022115/road_u2csrs.png"
                    title="Paella dish"
                    style={{
                        height: '360px',
                    }}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        Dolor sit amet, consectetuer adipiscing elit. Aenean
                        commodo ligula eget dolor. Aenean massa. Cum sociis
                        natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Donec quam felis, ultricies nec,
                        pellentesque eu, pretium quis, sem. Nulla consequat
                        massa quis enim. Donec pede justo, fringilla vel,
                        aliquet nec, vulputate eget, arcu. In enim justo,
                        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                        dictum felis eu pede mollis pretium. Integer tincidunt.
                        Cras dapibus. Vivamus elementum semper nisi. Aenean
                        vulputate eleifend tellus. Aenean leo ligula, porttitor
                        eu, consequat vitae, eleifend ac, enim. Aliquam lorem
                        ante, dapibus in, viverra quis, feugiat a, tellus.
                        Phasellus viverra nulla ut metus varius laoreet. Quisque
                        rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                        augue. Curabitur ullamcorper ultricies nisi. Nam eget
                        dui. Etiam rhoncus. Maecenas tempus, tellus eget
                        condimentum rhoncus, sem quam semper libero, sit amet
                        adipiscing sem neque sed ipsum. Nam quam nunc, blandit
                        vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec
                        odio et ante tincidunt tempus. Donec vitae sapien ut
                        libero venenatis faucibus. Nullam quis ante. Etiam sit
                        amet orci eget eros faucibus tincidunt. Duis leo. Sed
                        fringilla mauris sit amet nibh. Donec sodales sagittis
                        magna. Sed consequat, leo eget bibendum sodales, augue
                        velit cursus nunc,
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button color="primary">
                        <ThumbUpIcon />
                        Like
                    </Button>

                    <Button color="primary">
                        <ShareIcon />
                        Share with Friends
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default NewsFeedPost
