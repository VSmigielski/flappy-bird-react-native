import React from 'react'
import { Image } from 'react-native'

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 65
    const birdHeight = 50

    return (
        <Image style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth / 2),
            bottom: birdBottom - (birdHeight / 2),
            }} source={require('../assets/flappy-transparent.png')}>
        
        </Image>
    )
    
}

export default Bird;