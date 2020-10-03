import React, { useState } from "react";
import {
  TextInput,
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
  import axios from 'axios';
const HomeScreen = () => {
  // isButtonClicked determines whether to render the landing screen, the login screen, or the user signup
  const [isButtonClicked, setIsButtonClicked] = useState("home");
  // these hooks are for the input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // the content variable represents the portion of the page that will render conditionally
  let content;
  let passwordString;
  const postUser=(user)=>{
    axios.post('http://ec2-54-172-44-186.compute-1.amazonaws.com:3000/signup', user)
              .then((data)=>{
                console.log('success', data.data)
              })
            .catch((err)=>{
              console.log(user)
            })
//     fetch('http://ec2-54-172-44-186.compute-1.amazonaws.com:3000/signup', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({email: `${email}`, username: `${username}`, password: `${password}`})
// });

  }

  // isButtonClicked defaults to "home", which renders the login in and sign up buttons, and will change depending on which button the user clicks
  if (password !== confirmPassword){
    passwordString = <Text
    >Passwords do not match.</Text>
  } else {
    passwordString = null
  };
  if (isButtonClicked === "home") {
    content = (
      <View style={styles.landingButtons}>
        <View style={styles.homeButtonContainer}>
          <Button
            style={styles.homeButton}
            onPress={() => setIsButtonClicked("login")}
            color="white"
            title="Log In"
          />
        </View>
        <View style={styles.signUpButtonContainer}>
          <Button
            color="#b22222"
            title="Create Account"
            onPress={() => {
              setIsButtonClicked("signUp")
            }
          }
          />
        </View>
      </View>
    );
  }
  if (isButtonClicked === "login") {
    content = (
      <View style={styles.loginContainer}>
        <TextInput style={styles.usernameInput} placeholder="Username" />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          style={styles.usernameInput}
        />
        <View style={styles.homeButtonContainer}>
          <Button
            style={styles.homeButton}
            // onPress={() => {setIsButtonClicked("login")
            // }}
            color="white"
            title="Log In"
          />
        </View>
        <Button
          title="back"
          color="white"
          onPress={() => {
            setIsButtonClicked("home");
          }}
        />
      </View>
    )
  }
  if (isButtonClicked === "signUp") {
    content = (
      <View style={styles.signUpContainer}>
        <TextInput
          style={styles.usernameInput}
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.usernameInput}
          secureTextEntry={false}
          placeholder="Username"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          style={styles.usernameInput}
          secureTextEntry={true}
          placeholder="Password"
          autoCorrect={false}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={styles.usernameInput}
          secureTextEntry={true}
          placeholder="Confirm Password"
          autoCorrect={false}
          onChangeText={(confirm) => {
            setConfirmPassword(confirm)
          }}
        />
        <View style={styles.signUpButtonContainer}>
          <Button
            color="#b22222"
            title="Join Us!"
            onPress={() =>{ setIsButtonClicked("signUp")
            if(password === confirmPassword){
              let user = {email: `${email}`, username: `${username}`, password: `${password}`}
            //   axios.post('http://ec2-54-172-44-186.compute-1.amazonaws.com:3000/signup', user, {

            //     "headers": {

            //       "content-type": "application/json",

            //     },
            //   })
            //   .then((data)=>{
            //     console.log('success', data.data)
            //   })
            // .catch((err)=>{
            //   console.log('yuck', err)
            // })

            postUser(user);
          }
        }}
          />
        </View>
        <Button
          title="back"
          color="white"
          onPress={() => {
            setIsButtonClicked("home");
          }}
        />
    {passwordString}
      </View>
    );
  }
  return (
    <View style={styles.pageView}>
      {/* I am having issues making only the background opaque. The background image overtakes the page and we should try to correct this in the future */}
      <ImageBackground
        source={{
          uri:
            "https://mobileappcmurray.s3.us-east-2.amazonaws.com/barn+doors.jpg",
        }}
        style={styles.backgroundPhoto}
      >
        <View style={styles.container}>
          <TouchableOpacity
          onPress={() => {
            setIsButtonClicked("home")}}
            >
          <Image
            source={{
              uri:
                "https://mobileappcmurray.s3.us-east-2.amazonaws.com/farm2Market.png",
            }}
            style={styles.photo}
          />
          </TouchableOpacity>
          {content}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPhoto: {
    height: 1000,
  },
  loginContainer: {
    marginTop:85
  },
  signUpContainer: {
    marginTop: 75,
  },
  text: {
    fontSize: 30,
  },
  photo: {
    width: 210,
    height: 190,
    borderRadius: 30,
  },
  container: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 55,
  },
  usernameInput: {
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 8,
    paddingVertical: 1,
    paddingHorizontal: 12,
    marginTop: 10,
    width: 300,
    height: 50,
  },
  pageView: {
    opacity: 1,
  },
  homeButton: {
    borderColor: "white",
  },
  homeButtonContainer: {
    backgroundColor: "#b22222",
    color: "white",
    borderRadius: 50,
    elevation: 8,
    paddingVertical: 1,
    paddingHorizontal: 12,
    marginTop: 10,
    width: 300,
  },
  signUpButton: {
    color: "#b22222",
  },
  signUpButtonContainer: {
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 50,
    elevation: 8,
    paddingVertical: 1,
    paddingHorizontal: 12,
    marginTop: 10,
    width: 300,
  },
  landingButtons: {
    marginTop: 150,
  },
});

export default HomeScreen;
