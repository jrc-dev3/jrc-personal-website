import React from 'react'
import { Icon, Container, Menu, Tab, Grid, Button, Divider } from 'semantic-ui-react'
import SkillsContent from './SkillsContent'
import ProjectsContent from '../components/ProjectsContent'
import MediaPage from '../containers/MediaPage'
import '../../resources/css/index.css'
import ForceCanvas from './ForceCanvas'

const panes = [
  {
    menuItem: (
      <Menu.Item id="menu-item-1" key={0} index={0} header as="h2">
        <Icon name="cloud" />Media
      </Menu.Item>
    ),
    render: () => (<MediaPage key={3} />),
  },
  {
    menuItem: (
      <Menu.Item id="menu-item-2" key={1} index={1} header as="h2">
        <Icon name="desktop" />Skills
      </Menu.Item>
    ),
    render: () => (<SkillsContent key={4} />),
  },
  {
    menuItem: (
      <Menu.Item id="menu-item-4" key={2} index={2} header as="h2">
        <Icon name="paint brush" />Canvas
      </Menu.Item>
    ),
    // render: () => (<D3Canvas key={4} />),
    render: () => (<ForceCanvas key={4} />),
  },
  {
    menuItem: (
      <Menu.Item id="menu-item-3" key={3} index={3} header as="h2">
        <Icon name="folder open" />Projects
      </Menu.Item>
    ),
    render: () => (<ProjectsContent key={5} />),
  },
]

const lightbulbSVG = color => 
  <svg xmlns="http://www.w3.org/2000/svg"
     width="55" height="auto"
     viewBox="0 0 100 100"
    >
   <path id="Selection"
        fill={color} fillRule="nonzero" stroke="black" strokeWidth=".5"
        d="
           M 46.00,7.00
           C 46.00,7.00 46.00,17.00 46.00,17.00
             46.00,17.00 48.00,17.00 48.00,17.00
             48.00,17.00 48.00,7.00 48.00,7.00
             48.00,7.00 46.00,7.00 46.00,7.00 Z
           M 29.00,25.00
           C 29.00,25.00 22.00,17.00 22.00,17.00
             22.06,21.31 25.42,23.30 29.00,25.00 Z
           M 65.00,25.00
           C 69.49,22.87 70.87,21.49 73.00,17.00
             68.51,19.13 67.13,20.51 65.00,25.00 Z
           M 26.76,52.00
           C 28.76,57.63 32.27,60.09 35.04,65.00
             40.86,75.34 33.83,81.00 47.00,80.84
             48.29,81.00 50.75,81.01 51.94,80.84
             58.09,79.01 54.23,73.40 58.96,65.00
             63.27,57.35 69.56,53.25 68.67,43.00
             67.37,27.95 56.02,21.56 42.00,23.38
             28.98,26.99 22.21,39.17 26.76,52.00 Z
           M 64.96,46.00
           C 64.49,54.95 59.01,57.60 55.67,64.00
             51.55,71.89 54.61,76.29 49.85,77.69
             38.90,80.90 41.90,70.00 37.78,63.00
             35.46,59.06 32.03,56.32 30.23,52.00
             25.50,40.68 31.79,29.88 43.00,26.53
             56.10,24.43 65.66,32.55 64.96,46.00 Z
           M 11.00,42.00
           C 11.00,42.00 11.00,44.00 11.00,44.00
             11.00,44.00 21.00,44.00 21.00,44.00
             21.00,44.00 21.00,42.00 21.00,42.00
             21.00,42.00 11.00,42.00 11.00,42.00 Z
           M 73.00,42.00
           C 73.00,42.00 73.00,44.00 73.00,44.00
             73.00,44.00 83.00,44.00 83.00,44.00
             83.00,44.00 83.00,42.00 83.00,42.00
             83.00,42.00 73.00,42.00 73.00,42.00 Z
           M 21.00,69.00
           C 24.85,67.17 27.17,64.85 29.00,61.00
             24.66,63.06 23.06,64.66 21.00,69.00 Z
           M 73.00,69.00
           C 73.00,69.00 66.00,61.00 66.00,61.00
             66.06,65.31 69.42,67.30 73.00,69.00 Z
           M 39.00,84.00
           C 39.00,84.00 39.00,86.00 39.00,86.00
             39.00,86.00 55.00,86.00 55.00,86.00
             55.00,86.00 55.00,84.00 55.00,84.00
             55.00,84.00 39.00,84.00 39.00,84.00 Z
           M 39.00,90.00
           C 43.91,91.40 50.71,92.16 55.00,89.00
             55.00,89.00 39.00,90.00 39.00,90.00 Z
           M 43.00,93.00
           C 43.00,93.00 43.00,96.00 43.00,96.00
             43.00,96.00 51.00,96.00 51.00,96.00
             51.00,96.00 51.00,93.00 51.00,93.00
             51.00,93.00 43.00,93.00 43.00,93.00 Z" />
  </svg>

const pages = {
  'media': <MediaPage />,
  'skills': <SkillsContent />,
  'canvas': <ForceCanvas />,
  'projects': <ProjectsContent />,
}

class AboutMe extends React.Component {
  constructor(props) {
    super(props)
    this.dummyRef = React.createRef()

    this.state = {
      menuSelection: 'canvas',
      menuWidth: 0,
      bulbColor: 'black',
    }
  }

  handleScroll = event => {
    event.preventDefault()

    if (this.dummyRef) {
      this.dummyRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  isMobile = () => {
    let check = false
    const x = navigator.userAgent || navigator.vendor || window.opera
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(x) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(x.substr(0, 4))) check = true
    return check
  }


  openNav = () => {
    document.getElementById("menuButtonText").scrollIntoView({ block: 'start',  behavior: 'smooth' });
    document.getElementById("mySidenav").style.width = this.isMobile() ? "100%" : "15%"

    if (!this.isMobile()) {
      document.getElementById("myContent").style.marginLeft = '15%'
    }
    this.setState({ bulbColor: 'gold' })

  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0"
    document.getElementById("myContent").style.marginLeft = "0"
    this.setState({ bulbColor: 'black' })
  }

  handleSelection = userSelection => {
    this.setState({ menuSelection: userSelection })
    this.closeNav()
  }


  render() {

    const menuSelection = this.state.menuSelection
    const bulbColor = this.state.bulbColor

    return [
      <Container fluid >

        <Grid.Column stretched width={16}>
          <button onMouseEnter={this.openNav} style={{ width: '100%' }} className="myMenuButton" onClick={this.openNav}><p id='menuButtonText'>{lightbulbSVG(bulbColor)}</p></button>
        </Grid.Column>

        <div style={{ position: 'relative' }}>

          <div onMouseLeave={this.closeNav} id="mySidenav" className="sidenav">
            <div>
              <button id='menu-item-1' value='media' onClick={(event) => this.handleSelection(event.target.value)} >Media</button>
              <button id='menu-item-2' value='skills' onClick={(event) => this.handleSelection(event.target.value)} >Skills</button>
              <button id='menu-item-3' value='canvas' onClick={(event) => this.handleSelection(event.target.value)}>Canvas</button>
              <button id='menu-item-4' value='projects' onClick={(event) => this.handleSelection(event.target.value)}>Projects</button>
            </div>

          </div>


          <div id="myContent">
            {pages[menuSelection]}
          </div>
        </div>

      </Container>,
      <div ref={this.dummyRef} />,
    ]
  }
}

export default AboutMe
