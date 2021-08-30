import React from 'react'
import { View } from 'react-native'
import Pipe from '../assets/pipe.png';
import PipeTop from '../assets/pipe-top.png';

const Obstacles = ({randomBottom, color, obstaclesLeft, obstacleHeight, obstacleWidth, gap}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}/>

            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}/>
        </>
    )
}

export default Obstacles