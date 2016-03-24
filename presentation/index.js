// Import React
import React from "react";

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
import notes from "./notes";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  carina: require("../assets/carina.jpg"),
  hudf: require("../assets/hubble-ultra-deep-field.jpg"),
  jwst: require("../assets/jwst.jpg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#ff4081"
});

const a = new Audio("http://hexrays.at/assets/miles.m4a");
let isPlaying = false;
let intervalID;

function fadeOut() {
  let vol = a.volume;
  // Reduce volume by 0.05 as long as it is above 0
  // This works as long as you start with a multiple of 0.05!
  if (vol > 0) {
    vol -= 0.05;
    // limit to 2 decimal places
    // also converts to string, works ok
    a.volume = vol.toFixed(2);
  } else {
    // Stop the setInterval when 0 is reached
    window.clearInterval(intervalID);
    a.pause();
  }
}

function onAudioTimeUpdate() {
  if (a.currentTime >= 36 && isPlaying) {
    isPlaying = false;
    intervalID = setInterval(() => {fadeOut() }, 100);
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
    a.addEventListener("timeupdate", onAudioTimeUpdate, false);

    if (window.location.search !== "?presenter" && window.location.pathname === "/0") {
      a.play();
      isPlaying = true;
    }
    // this.startSlideshow();
  }

  startSlideshow() {
    this.setState({isPlaying: true});

    this.interval = window.setInterval(() => {
      Podium.keydown(39);
    }, 2000);

    document.addEventListener("keypress", this.onKeyDown, false);
  }

  stopSlideShow() {
    this.setState({isPlaying: false});
    window.clearInterval(this.interval);
  }

  onKeyDown(e) {
    console.log(e);
  }

  render() {
    return (
      <Spectacle theme={theme} >
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>

          <Slide transition={["zoom"]} bgImage={images.carina.replace("/", "")}>
            <Appear fid="1">
              <Heading size={1} fit caps lineHeight={1} textColor="white">
                Extreme Science
              </Heading>
            </Appear>
            <Appear fid="1">
              <Heading size={1} fit caps>
                NASA's James Webb Space Telescope
              </Heading>
            </Appear>
          </Slide>

          <Slide transition={["slide"]} bgImage={images.hudf.replace("/", "")} notes={notes.slide2}>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              So the most interesting thing I saw at SXSW
            </Heading>
            <Heading size={2} caps fit textColor="orange" textFont="primary">
              wasn't some epic science-fiction vision into the future.
            </Heading>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              I was an insane look into the past.
            </Heading>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              But we'll get there...
            </Heading>
          </Slide>

          <Slide transition={["zoom", "fade"]} bgColor="black" notes="<ul><li>talk about that</li><li>and that</li></ul>">
            <Image src={images.jwst.replace("/", "")} margin="0px auto 40px" height="500px"/>
            <Heading size={1} caps fit textColor="white" textFont="primary">
              The James Webb Space Telescope is the successor to the Hubble.
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgImage={images.hudf.replace("/", "")} bgDarken={0.5}>
            <Appear fid="1">
              <Heading size={1} caps fit textColor="primary">
                Full Width
              </Heading>
            </Appear>
            <Appear fid="2">
              <Heading size={1} caps fit textColor="tertiary">
                Adjustable Darkness
              </Heading>
            </Appear>
            <Appear fid="3">
              <Heading size={1} caps fit textColor="primary">
                Background Imagery
              </Heading>
            </Appear>
          </Slide>

          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Flexible Layouts</Heading>
            <Layout>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Left
                </Heading>
              </Fill>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Right
                </Heading>
              </Fill>
            </Layout>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
            <BlockQuote>
              <Quote>Wonderfully formatted quotes</Quote>
              <Cite>Ken Wheeler</Cite>
            </BlockQuote>
          </Slide>

          <Slide transition={["spin", "zoom"]} bgColor="tertiary">
            <Heading caps fit size={1} textColor="primary">
              Inline Markdown
            </Heading>
            <Markdown>
              {`
![Markdown Logo](${images.markdown.replace("/", "")})

You can write inline images, [Markdown Links](http://commonmark.org), paragraph text and most other markdown syntax
* Lists too!
* With ~~strikethrough~~ and _italic_
* And lets not forget **bold**
              `}
            </Markdown>
          </Slide>

          <Slide transition={["slide", "spin"]} bgColor="primary">
            <Heading caps fit size={1} textColor="tertiary">
              Smooth
            </Heading>
            <Heading caps fit size={1} textColor="secondary">
              Combinable Transitions
            </Heading>
          </Slide>

          <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
            <List>
              <Appear><ListItem>Inline style based theme system</ListItem></Appear>
              <Appear><ListItem>Autofit text</ListItem></Appear>
              <Appear><ListItem>Flexbox layout system</ListItem></Appear>
              <Appear><ListItem>React-Router navigation</ListItem></Appear>
              <Appear><ListItem>PDF export</ListItem></Appear>
              <Appear><ListItem>And...</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={1} caps fit textColor="tertiary">
              Your presentations are interactive
            </Heading>
            <Interactive/>
          </Slide>

          <Slide transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              Made with love in Seattle by
            </Heading>
            <Link href="http://www.formidablelabs.com">fl</Link>
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
