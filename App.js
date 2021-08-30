import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'
import Background from './assets/bg-darker.png';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2) 
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + (screenWidth / 2) + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)

  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const color = 'green'
  const color2 = 'yellow'
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

  // Start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])

  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom(birdBottom => birdBottom + 60)
    }
  }

  // Start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
      setScore(score => score + 1)
    }
  }, [obstaclesLeft])

  // Start second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo( - Math.random() * 100)
      setScore(score => score + 1)
    }
  }, [obstaclesLeftTwo])

  useEffect(() => {
    console.log(obstaclesLeft)
    console.log(screenWidth/2)
    console.log(obstaclesLeft > screenWidth/2)
    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
      )
      || 
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
      (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
      )
      ) 
      {
      console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    setIsGameOver(true)
  }

  if (!fontsLoaded) {
    return <Text style={{fontSize: '30px', fontFamily: 'Poppins_500Medium'}}>Loading...</Text>;
  } else {
  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      {isGameOver && <Text style={{fontSize: '30px', fontFamily: 'Poppins_500Medium'}}>Score: {score}</Text>}
      <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
      <Obstacles 
        obstaclesLeft={obstaclesLeft}
        obstacleHeight={obstacleHeight}
        obstacleWidth={obstacleWidth}
        randomBottom={obstaclesNegHeight}
        gap={gap}
        color={color}
      />
      <Obstacles 
        obstaclesLeft={obstaclesLeftTwo}
        obstacleHeight={obstacleHeight}
        obstacleWidth={obstacleWidth}
        randomBottom={obstaclesNegHeightTwo}
        gap={gap}
        color={color2}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${Background})`
  },
});
