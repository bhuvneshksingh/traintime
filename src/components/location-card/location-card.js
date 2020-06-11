import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

export default class LocationCard extends Component {
    render() {
        const itemId = this.props[1].id;
        const cardKey = this.props[0];
        return (
            <Card className="location-card">
                <CardActionArea onClick={() => this.props.handleClickOnCard(itemId, cardKey)}>
                    <CardMedia
                        className="location-card-media"
                        image={this.props[1].photoURL}
                        title={this.props[1].photoDescription}
                    >
                        <h5>{this.props[1].name}</h5>
                    </CardMedia>
                </CardActionArea>
            </Card>
        )
    }


}
