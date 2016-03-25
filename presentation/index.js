// Import React
import React from "react";

import YouTube from 'react-youtube';

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

import Podium from "../utils/helpers";
import Timer from "../utils/Timer";
import notes from "./notes";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");




const images = {
  carina: require("../assets/carina.jpg"),
  hudf: require("../assets/hubble-ultra-deep-field.jpg"),
  scale: require("../assets/scale-v-hubble.gif"),
  jwst: require("../assets/jwst.jpg"),
  orbit: require("../assets/orbit.jpg"),
  mirror: require("../assets/mirror.jpg"),
  timespace: require("../assets/distance-in-time.jpg"),
  spectrum: require("../assets/spectrum.jpg"),
  spectrograph: require("../assets/spectrograph.jpg"),
  visVsNear: require("../assets/vis-vs-near-inf.jpg"),
  milkyWay: require("../assets/milky-way.jpg"),
  unfold: require("../assets/unfold.jpg"),
  unfoldGif: require("../assets/unfold.gif"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#F35733",
  secondary: "#00D5DC",
  tertiary: "#E6E5E5"
});

const youTubeOpts = {
  height: '360',
  width: '640',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0
  }
}

let a;
let isPlaying = false;
let intervalID;

function fadeOut() {
  let vol = a.volume;
  if (vol > 0) {
    vol -= 0.05;
    a.volume = vol.toFixed(2);
  } else {
    window.clearInterval(intervalID);
    a.pause();
    a.removeEventListener("timeupdate", onAudioTimeUpdate, false);
  }
}

function fadeIn() {
  let vol = a.volume;
  if (vol < 1) {
    vol += 0.05;
    a.volume = vol.toFixed(2);
  } else {
    window.clearInterval(intervalID);
  }
}

function onAudioTimeUpdate() {
  if (a.currentTime >= 36 && isPlaying) {
    isPlaying = false;
    intervalID = setInterval(() => {fadeOut() }, 100);
  }
}

class AudioTrigger extends React.Component {
  componentDidMount() {
    if (window.location.search !== "?presenter" && window.location.pathname === "/0") {
      // a.addEventListener("timeupdate", onAudioTimeUpdateAgain, false);
      a.currentTime = 201;
      a.volume = 0;
      a.play();
      intervalID = setInterval(() => {fadeIn() }, 250);
      isPlaying = true;
      console.log('mount');
    }
  }
  render() {
    return (<div></div>);
  }
}

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  componentDidMount() {

    if (window.location.search !== "?presenter" && window.location.pathname === "/0") {
      a = new Audio("http://hexrays.at/assets/miles.m4a")
      a.addEventListener("timeupdate", onAudioTimeUpdate, false);
      a.currentTime = 0.5;
      a.volume = 0;
      a.play();
      intervalID = setInterval(() => {fadeIn() }, 250);
      isPlaying = true;
    }

    if (window.location.search !== "?manual"){
      // this.startSlideshow();
    }

  }

  startSlideshow() {
    this.setState({isPlaying: true});

    this.interval = window.setInterval(() => {
      Podium.keydown(39);
    }, 20000);

  }

  stopSlideShow() {
    this.setState({isPlaying: false});
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <Spectacle theme={theme} >
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>

          <Slide notes={notes.slide1} transition={["zoom", "fade"]} bgImage={images.hudf.replace("/", "")} bgDarken={0.75}>
          </Slide>

          <Slide notes={notes.slide2} transition={["zoom"]} bgImage={images.carina.replace("/", "")}>
            <Appear fid="1">
              <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
                Extreme Science
              </Heading>
            </Appear>
            <Appear fid="2">
              <Heading size={1} fit caps>
                NASA's James Webb Space Telescope
              </Heading>
            </Appear>
          </Slide>

          <Slide notes={notes.slide3} transition={["slide"]} bgColor="black" notes={notes.slide3}>
            <Image src={images.jwst.replace("/", "")} margin="0px auto 40px" height="500px"/>
          </Slide>

          <Slide transition={["zoom", "fade"]} bgImage="http://jwst.nasa.gov/WebbCamWide/CLNRMR-800px.jpg" notes={notes.slide4}>

          </Slide>

          <Slide notes={notes.slide5} transition={["zoom", "fade"]} bgColor="black" >
            <Heading size={1} caps fit textColor="white" textFont="primary">
              Successor to the Hubble.
            </Heading>
            <Image src={images.scale.replace("/", "")} margin="40px auto 0" height="255px"/>
          </Slide>

          <Slide notes={notes.slide6} transition={["slide"]} bgImage={images.hudf.replace("/", "")} bgDarken={0.75}>
            <Image src={images.unfold.replace("/", "")} margin="0 auto" height="350px"/>
            <Image src={images.unfoldGif.replace("/", "")} margin="20px auto 0" height="275px"/>
          </Slide>

          <Slide notes={notes.slide7} transition={["zoom", "fade"]} bgColor="primary">
            <Image src={images.orbit.replace("/", "")} margin="0 auto" height="600px"/>
          </Slide>

          <Slide notes={notes.slide8} transition={["slide"]} bgColor="black">
            <Heading caps fit size={1} textColor="tertiary">
              Beryllium mirrors coated with gold for superior reflection.
            </Heading>
            <Image src={images.mirror.replace("/", "")} margin="40px auto 0" height="600px"/>
          </Slide>

          <Slide notes={notes.slide9} transition={["spin", "zoom"]} bgColor="tertiary">
            <YouTube
              videoId="y9Z2GbFJWmo"
              opts={youTubeOpts}
            />
          </Slide>

          <Slide notes={notes.slide10} transition={["slide", "spin"]} bgColor="black">
            <Heading caps fit size={1} textColor="tertiary">
              Some Nerd Stuff
            </Heading>
            <List>
              <Appear><ListItem textColor="primary">The speed of light is approx ‎671 million mph</ListItem></Appear>
              <Appear><ListItem textColor="primary">1 light year is nearly 6 trillion miles</ListItem></Appear>
              <Appear><ListItem textColor="primary">It takes 8 minutes for light to travel from the Sun to the earth</ListItem></Appear>
              <Appear><ListItem textColor="primary">It takes 100,000 years for light to travel across the Milky Way Galaxy</ListItem></Appear>
              <Appear><ListItem textColor="primary">As light waves travel, they stretch out, leaving the visible spectrum and becoming infrared.</ListItem></Appear>
            </List>
          </Slide>

          <Slide notes={notes.slide11} transition={["fade"]} bgColor="primary" textColor="primary">
            <Image src={images.spectrum.replace("/", "")} margin="40px auto 0" height="600px"/>

          </Slide>

          <Slide notes={notes.slide12} transition={["slide"]} bgColor="black">
            <Heading size={1} caps fit textColor="tertiary">
              Hubble's Visible Spectrum vs Near Infrared
            </Heading>
            <Image src={images.visVsNear.replace("/", "")} margin="40px auto 0" height="600px"/>
          </Slide>

          <Slide notes={notes.slide13} transition={["fade"]} bgImage={images.hudf.replace("/", "")} bgDarken={0.75}>
            <Heading size={1} caps fit textColor="tertiary">
              This is how they look for other habitable planets
            </Heading>
            <Image src={images.spectrograph.replace("/", "")} margin="60px auto 0" height="200px"/>
          </Slide>

          <Slide notes={notes.slide14} transition={["spin", "zoom"]} bgImage={images.milkyWay.replace("/", "")} bgDarken={0.15}>
            <Heading size={1} caps fit textColor="tertiary">
              The Milky Way
            </Heading>
          </Slide>

          <Slide notes={notes.slide15} transition={["slide"]} bgImage={images.hudf.replace("/", "")}>
            <Appear fid="1">
              <Heading size={1} caps fit textColor="tertiary">
                Hubble Ultra Deep Field
              </Heading>
            </Appear>
          </Slide>

          <Slide notes={notes.slide15} transition={["slide"]} bgColor="black">
              <Image src={images.timespace.replace("/", "")} margin="60px auto 0" height="500px"/>
          </Slide>

          <Slide notes={notes.slide16} transition={["zoom", "fade"]} bgColor="tertiary">
            <Heading size={1} textColor="primary" fit caps>
                James Webb Space Telescope
            </Heading>
            <List>
              <Appear><ListItem textColor="primary">Involves more than 1,000 people</ListItem></Appear>
              <Appear><ListItem textColor="primary">in 17 countries</ListItem></Appear>
              <Appear><ListItem textColor="primary">over 2 decades</ListItem></Appear>
              <Appear><ListItem textColor="primary">and costs about 8.7 billion dollars</ListItem></Appear>
            </List>
          </Slide>

          <Slide notes={notes.slide17} transition={["slide"]} bgImage={images.hudf.replace("/", "")} bgDarken={0.75}>
            <Appear fid="1">
              <Heading size={1} caps fit textColor="tertiary">
                It's orbit is too far away from Earth for repairs to be made.
              </Heading>
            </Appear>
          </Slide>



          <Slide notes={notes.slide19} transition={["slide"]} bgImage={images.milkyWay.replace("/", "")} bgDarken={0.15}>
            <Heading size={1} caps fit textColor="tertiary">
              Thanks!
            </Heading>
            <AudioTrigger/>
          </Slide>

          <Slide notes={notes.slide20} transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              If you want to see more...
            </Heading>

            <List>
              <Appear><ListItem textColor="primary">James Web Space Telescope</ListItem></Appear>
              <Appear><ListItem textColor="primary"><Link href="http://jwst.nasa.gov/">http://jwst.nasa.gov/</Link></ListItem></Appear>
              <Appear><ListItem textColor="primary">The rest of my  SXSW notes </ListItem></Appear>
              <Appear><ListItem textColor="primary"><Link href="https://github.com/Hexrays/SXSW-2016_Notes">github.com/Hexrays/SXSW-2016_Notes</Link></ListItem></Appear>
            </List>
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}


          // <Slide notes={notes.slide18} transition={["slide"]} >
          //   <Heading size={1} caps fit textColor="tertiary">
          //   </Heading>
          // </Slide>