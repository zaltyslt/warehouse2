import React, {Component, useEffect, useState} from 'react';
import {Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader} from 'semantic-ui-react';
import {authApi} from '../misc/AuthApi';
import {publicApi} from "../misc/PublicApi";
import {handleLogError} from '../misc/Helpers';


export function Home() {

    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfOrders, setNumberOfOrders] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        setIsLoading(true);
        try {
            let response = await publicApi.numberOfUsers();
            const responseData1 = response.data;
            setNumberOfUsers(responseData1);
            response = await publicApi.numberOfOrders();
            const responseData2 = response.data;
            setNumberOfOrders(responseData2);

        } catch (error) {
            handleLogError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();

    }, []);

    if (isLoading) {
        return (
            <Segment basic style={{marginTop: window.innerHeight / 2}}>
                <Dimmer active inverted>
                    <Loader inverted size='huge'>Loading</Loader>
                </Dimmer>
            </Segment>
        );
    } else {
        //   } else {
        //     const { numberOfUsers, numberOfOrders } = this.state
        return (
            <Container text>

                <Grid stackable columns={2}>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Segment color='violet'>
                                <Statistic>
                                    <Statistic.Value><Icon name='user' color='grey'/>{numberOfUsers}</Statistic.Value>
                                    <Statistic.Label>Users</Statistic.Label>
                                </Statistic>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Segment color='violet'>
                                <Statistic>
                                    <Statistic.Value><Icon name='laptop' color='grey'/>{numberOfOrders}
                                    </Statistic.Value>
                                    <Statistic.Label>Orders</Statistic.Label>
                                </Statistic>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />*/}
                {/*<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />*/}
            </Container>


        );
    }
}

// export default HomeO