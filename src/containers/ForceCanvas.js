/* eslint-disable func-names */
import React, { Component } from 'react'
import { Grid, Divider, Button } from 'semantic-ui-react'
import { select, selectAll, mouse } from 'd3-selection'
import { drag } from 'd3-drag'
import { forceSimulation, forceLink, forceManyBody, forceX, forceY, forceCollide, forceCenter } from 'd3-force' 
import { zoom } from 'd3-zoom'

// D3 V4 Modular D3 Object Assignment
const event = () => require('d3-selection').event
const libs = {
  select,
  selectAll,
  event,
  mouse,
  drag,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  forceCollide,
  forceCenter,
  zoom,
}
const d3 = {...libs}


class ForceCanvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canvasWidth: null,
      finalPosition: null,
      parentCounter: 1,
      childCounter: 0,
      nodes: [
        {
          id: 'circle-1'
        },
      ],
      links: [],
    }
  }

  componentDidMount = () => {
    this.createCanvas()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const currentWidth = d3.select('.canvas').node().getBoundingClientRect().width
    if( this.state.canvasWidth !== currentWidth){
      this.setState({ canvasWidth: currentWidth })
    }

    if ((prevState.nodes !== this.state.nodes 
      && prevState.links !== this.state.links) || prevState.canvasWidth !== this.state.canvasWidth) {
      this.resizeCanvas()
    }
  }

  componentWillUnmount = () => {
    this.force.stop()
  }

  isMobile = () => {
    let check = false
    const x = navigator.userAgent||navigator.vendor||window.opera
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(x)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(x.substr(0, 4))) check = true
    return check
  }

  createCanvas = () => {
    const parentW = d3.select('.canvas').node().getBoundingClientRect().width
    const parentH = this.isMobile() ? parentW * 2 : parentW/2
    const links = this.state.links
    const nodes = this.state.nodes
    const that = this

    this.force = d3.forceSimulation(nodes)
    .force('link', d3.forceLink().id(d => d.id).links(links))
    .force('charge', d3.forceManyBody().strength(-1000))
    .force("x",d3.forceX(parentW/2).strength(0.4))
    .force("y",d3.forceY(parentH/2).strength(0.6))
    //.force('center', d3.forceCenter(parentW/2, parentW/4))
    .force('collision', d3.forceCollide().radius(parentW * 0.02))
    .alphaTarget(1)
    .on('tick', function() {
      that.ticked(that.state)
    })

    d3.select('.canvas')
      .append('svg')
      .attr('viewBox', [0, 0, parentW, parentH])
      .attr('id', 'svg-container')
      .style('background-color', '#414a4c')
      .style('border', '1px solid #d1d1d1')
      .style('stroke-width', 2)
      .on('click', function () {
        that.canvasClick(d3.select(this))
      })
      .call(d3.zoom()
        .scaleExtent([-10,10])
        .on('zoom', () => {
          d3.select('#svg-canvas')
            .attr('transform', d3.event().transform)
        }))
        .on('dblclick.zoom', null)
      // .on('dblclick', () => {
      //   that.setState( prevState => ({
      //     nodes: [...prevState.nodes, { id: `circle-${prevState.nodes.length + 1}`}]
      //   }))
      // })


    d3.select('#svg-container')
      .append('g')
      .attr('id', 'svg-canvas')

    this.setState({ canvasWidth: parentW })
  }

  ticked = (myState) => {
    const nodes = myState.nodes
    const links = myState.links
    const parentW = myState.canvasWidth

    d3.select('#svg-canvas')
      .selectAll('line')
      .data(links)
      .exit()
      .remove()

    d3.select('#svg-canvas')
      .selectAll('circle')
      .data(nodes)
      .exit()
      .remove()

    d3.select('#svg-canvas')
      .selectAll('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)


    d3.select('#svg-canvas')
      .selectAll('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      // .attr('cx', d => d.x = Math.max(parentW * 0.02, Math.min(parentW - (parentW * 0.02), d.x)))
      // .attr('cy', d => d.y = Math.max(parentW * 0.02, Math.min((parentW/2) - (parentW * 0.02), d.y)))
  }

  onReset = () => {
    console.log('resetting..')
    this.setState({
      nodes: [{ id: 'circle-1' }],
      links: [],
      parentCounter: 1,
      childCounter: 0
    })

    
  }

  resizeCanvas = () => {
    // console.log(this.state)
    const parentW = this.state.canvasWidth
    const parentH = this.isMobile() ? parentW * 2 : parentW/2
    const parentRadius = this.isMobile() ? parentW * 0.08 : parentW * 0.02
    const childRadius = this.isMobile() ?  parentW * 0.05 : parentW * 0.01
    const nodes = this.state.nodes
    const links = this.state.links
    const that = this

    // update data
    this.force
      .nodes(nodes)
      .force('link').links(links)

    // update bearings
    this.force
      .force('center', d3.forceCenter(parentW/2, parentH/2))

    // restart force simulation
    this.force
      .alpha(1).restart()

    d3.select('#svg-container')
      .attr('viewBox', [0, 0, parentW, parentH])

    d3.select('#svg-canvas')
      .selectAll('line')
      .data(links)
      .exit()
      .remove()

    d3.select('#svg-canvas')
      .selectAll('circle')
      .data(nodes)
      .exit()
      .remove()

    d3.select('#svg-canvas')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .style('stroke', 'white')
      .style('stroke-width', 2)

    d3.select('#svg-canvas')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
        .attr('id', d => d.id)
        .attr('r', d => d.id.includes('circle')? parentRadius: childRadius)
        .attr('class', d => d.id.includes('circle')? 'parentCircle':'childCircle')
        .style('fill', d => d.id.includes('circle')? 'gold':'#'+(Math.random().toString(16) + '0000000').slice(2, 8))
        .style('stroke', 'whitesmoke' )
        .style('stroke-width', d => d.id.includes('circle')? 4:1)
      .call(that.drag())
      .on('click', function () {
        console.log(d3.event)
        that.click(d3.select(this))
      })

    //d3.selectAll('circle')
      // .transition() 
      //   .duration(1000)
      // .style('fill', d => d.id.includes('circle')? 'gold':'#'+(Math.random().toString(16) + '0000000').slice(2, 8))
      //   .on('end', that.changeColor)


    // d3.selectAll('circle')
    //   .data(nodes)
    //   .enter()
    //   .transition()
    //   .duration(1000)
    //     .style('fill', d => d.id.includes('circle')? 'gold':'#'+(Math.random().toString(16) + '0000000').slice(2, 8))
    //     .on('end', that.changeColor)
    }

  changeColor = () => {

    d3.selectAll('circle')
      .transition()
      .duration(1000)
        .style('fill', d => d.id.includes('circle')? 'gold':'#'+(Math.random().toString(16) + '0000000').slice(2, 8))
        .on('end', this.changeColor)

  }

  canvasClick = () => {

    if (d3.event().defaultPrevented) return

    const that = this
    //console.log('canvas click')
    //console.log(that.state)
    const latestCircleId = that.state.parentCounter
    const newChildId = that.state.childCounter + 1

    const newNode = {
      id: `child-${newChildId}`
    }

    const newLink = {
      source: `circle-${latestCircleId}`,
      target: `child-${newChildId}`,
    }

    that.setState( prevState => ({
      links: [...prevState.links, newLink],
      nodes: [...prevState.nodes, newNode],
      childCounter: prevState.childCounter + 1
    }))

    // d3.event().stopPropagation()
    
  }

  click = clickedCircle => {
    if (d3.event().defaultPrevented) return

   // console.log('click')
    const that = this
    const selectedCircleId = clickedCircle._groups[0][0].id
    const newChildId = that.state.childCounter + 1
    // console.log(selectedCircleId)
    // console.log(newChildId)

    // if (circleId.includes('child')) return

    const newNode = {
      id: `child-${newChildId}`
    }

    const newLink = {
      source: selectedCircleId,
      target: `child-${newChildId}`,
    }

    that.setState( prevState => ({
      links: [...prevState.links, newLink],
      nodes: [...prevState.nodes, newNode],
      childCounter: prevState.childCounter + 1
    }))

    d3.event().stopPropagation()
  }

  drag = () => {
    const that = this
    let startPosition
    let endPosition

    const parentW = this.state.canvasWidth
    const parentH = this.isMobile() ? parentW * 2 : parentW/2
    const parentRadius = this.isMobile() ? parentW * 0.08 : parentW * 0.02
    const childRadius = this.isMobile() ?  parentW * 0.05 : parentW * 0.01

    function dragstarted(d) {
      console.log(d3.event())
      if (!d3.event().active) that.force.alphaTarget(0.3).restart()
      
        d.fx = d.x
        d.fy = d.y


        const circleId = d3.select(this)._groups[0][0].id
        // d3.select(`#${circleId}`)
        //   .transition()
        //   .attr('r', that.state.canvasWidth * .02 * 2)
          // .on('end', () =>{
          //   d3.select(`#${circleId}`)
          //     .attr('r', that.state.canvasWidth * .02)
          // })

        startPosition = d3.mouse(this)
    }

    function dragged(d) {

      const circleId = d3.select(this)._groups[0][0].id
      d3.select(`#${circleId}`)
        .attr('r', circleId.includes('circle')? parentRadius * 2: childRadius * 2)

      d.fx = d3.event().x
      d.fy = d3.event().y
    }

    function dragended(d) {
      if (!d3.event().active) that.force.alphaTarget(0)

      // handle click 
      endPosition = d3.mouse(this)
      if ( startPosition[0] == endPosition[0] && startPosition[1] == endPosition[1] ) return

      const circleId = d3.select(this)._groups[0][0].id
      const latestCircle = circleId.includes(`circle-${that.state.parentCounter}`)
      const parentCircle = circleId.includes(`circle`)

      d.fx = null
      d.fy = null

      if (parentCircle) {
        d3.select(`#${circleId}`)
          .attr('r', parentRadius)

        const newParentLink = {
          source: circleId,
          target: `circle-${that.state.parentCounter + 1}`
        }

        that.setState( prevState => ({
          nodes: [...prevState.nodes, { id: `circle-${prevState.parentCounter + 1}`}],
          links: [...prevState.links, newParentLink],
          parentCounter: prevState.parentCounter +1
        }))
      }else{
        d3.select(`#${circleId}`)
        .transition()
          .attr('r', childRadius)
      }
    }

    return (
      d3.drag()
       // .subject(this.force.find(d3.event().x, d3.event().y))
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )
  }

  onSvgSave = () => {

    const parentW = this.state.canvasWidth
    const parentH = this.isMobile() ? parentW * 2 : parentW/2

    const html = d3.select("#svg-container")
      .attr("version", 1.1)
      //.attr("xmlns", "http://www.w3.org/2000/svg")
      .node().parentNode.innerHTML

    const imgsrc = 'data:image/svg+xml;base64,'+ btoa(html)
    const canvas = d3.select("#customcanvas")
    const context = canvas.node().getContext("2d")

    d3.select("#download-link")
    .attr('href', imgsrc)
    document.getElementById("download-link").click()    
    // let image = new Image()
    // image.src = imgsrc
    // image.onload = function() {
    //   context.drawImage(image, 0, 0)
    //   const canvasdata = canvas.node().toDataURL("image/png")
    //   d3.select("#download-link")
    //     //.attr('href', canvasdata)
    //     .attr('href', imgsrc)
    //   document.getElementById("download-link").click()
    //   //context.clearRect(0, 0, parentW, parentH);
    //}
  }

  render() {

    return (
      <Grid padded >
        <Grid.Column width={16} stretched >
          <div className="canvas" />

          <div style={{display:'none'}} id="png-container">
            <canvas id="customcanvas" ></canvas>
            <a id="download-link" download="my_own.svg">TEST</a> 
          </div >

        </Grid.Column >
        <Grid.Column width={8} stretched  >
          <Button onClick={this.onSvgSave} content="save" />
        </Grid.Column >
        <Grid.Column width={8} stretched >
          <Button onClick={this.onReset} content="reset" />
        </Grid.Column >
      </Grid>
    )
  }
}

export default ForceCanvas
