import React from 'react';

const styles={
  drumMachine:{
    position:"relative",
    display:"flex",
    outline: "5px solid orange",
    width:"600px",
    textAlign:"center",
    backgroundColor:"#b3b3b3",
    fontFamily:"Arial",
    fontSize:"18px",
    fontWeight:"600"
  },
  drumBank:{
    display:"grid",
    gridTemplateColumns:"100px 100px 100px",
    gridTemplateRows:"80px 80px 80px",
    margin:"20px"
  },
  drumPad:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"90px",
    height:"70px",
    borderRadius:"10px",
    backgroundColor:"#8d8d8d",
    fontWeight:"400",
    fontSize:"18px",
    cursor:"pointer",
    boxShadow:"black 3px 3px 5px"
  },
  drumPadDown:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"90px",
    height:"70px",
    borderRadius:"10px",
    backgroundColor:"orange",
    fontWeight:"400",
    fontSize:"18px",
    cursor:"pointer",
    boxShadow:"orange 0px 3px",
  },
  logo:{
    position:"absolute",
    top:"5px",
    right:"5px",
    fontSize:"1.2rem",
    fontWeight:"600",
    fontStyle:"italic"
  },
  controller:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    width:"250px",
    margin:"auto 0"
  },
  screen:{
    width:"200px",
    backgroundColor:"grey",
    padding:"10px",
    margin:"5px"
  },
  switch:{
    border:"1px solid black",
    width:"50px",
    height:"20px",
    padding:"1px",
    backgroundColor:"black"
  },
  innerSwitchRight:{
    border:"1px solid black",
    width:"23px",
    height:"19px",
    background:"blue",
    cursor:"pointer",
    float:"right"
  },
  innerSwitchLeft: {
    border:"1px solid black",
    width:"23px",
    height:"19px",
    background:"blue",
    cursor:"pointer",
    float:"left"
  }
}

const keyboards=['Q','W','E','A','S','D','Z','X','C'];
const descriptions={
  KIT1:"Heater Kit",
  KIT2:"Smooth Piano Kit",
  Q1:"Heater 1",
  Q2:"Chord 1",
  W1:"Heater 2",
  W2:"Chord 2",
  E1:"Heater 3",
  E2:"Chord 3",
  A1:"Heater 4",
  A2:"Shaker",
  S1:"Clap",
  S2:"Open HH",
  D1:"Open HH",
  D2:"Closed HH",
  Z1:"Kick n'Hat",
  Z2:"Punchy Kick",
  X1:"Kick",
  X2:"Side Stick",
  C1:"Closed HH",
  C2:"Snare"
};

const audioPath=`${process.env.PUBLIC_URL}/audio/`;
const audios={
  Q1:`${audioPath}Heater-1.mp3`,
  Q2:`${audioPath}Chord_1.mp3`,
  W1:`${audioPath}Heater-2.mp3`,
  W2:`${audioPath}Chord_2.mp3`,
  E1:`${audioPath}Heater-3.mp3`,
  E2:`${audioPath}Chord_3.mp3`,
  A1:`${audioPath}Heater-4_1.mp3`,
  A2:`${audioPath}Give_us_a_light.mp3`,
  S1:`${audioPath}Heater-6.mp3`,
  S2:`${audioPath}Dry_Ohh.mp3`,
  D1:`${audioPath}Dsc_Oh.mp3`,
  D2:`${audioPath}Bld_H1.mp3`,
  Z1:`${audioPath}Kick_n_Hat.mp3`,
  Z2:`${audioPath}punchy_kick_1.mp3`,
  X1:`${audioPath}RP4_KICK_1.mp3`,
  X2:`${audioPath}side_stick_1.mp3`,
  C1:`${audioPath}Cev_H2.mp3`,
  C2:`${audioPath}Brk_Snr.mp3`
};


class DrumPad extends React.Component{
  constructor(props){
    super(props);
    this.state={
      keyboard:props.keyboard,
      style:styles.drumPad
    };
    this.handleClick=this.handleClick.bind(this);
    this.handleKeyDown=this.handleKeyDown.bind(this);
  }

  animate(){
    if(this.props.power){
      this.setState({
        style: this.state.style.backgroundColor==="orange"?styles.drumPad:styles.drumPadDown
      });
    }
  }

  playSound(){
    if(this.props.power){
      let sound=this.audio;
      sound.currentTime=0;
      sound.volume=this.props.volume;
      this.animate();
      setTimeout(()=>this.animate(), 100);
      sound.play();
      document.getElementById("screen")
          .innerHTML=descriptions[`${this.state.keyboard}${this.props.bank}`];
    }
  }

  handleClick(){
    this.playSound();
  }

  handleKeyDown(event){
    if(event.keyCode===this.state.keyboard.charCodeAt()){
      this.playSound();
    }
  }

  componentDidMount(){
    document.getElementById(`drum-pad-${this.state.keyboard}`)
          .addEventListener("click", this.handleClick);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(){
    document.getElementById(`drum-pad-${this.state.keyboard}`)
          .removeEventListener("click", this.handleClick);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render(){
    return(
      <div className="drum-pad" id={`drum-pad-${this.state.keyboard}`} style={this.state.style}>
      <audio className="clip" ref={ref=>{this.audio=ref}}
              src={audios[`${this.props.keyboard}${this.props.bank}`]}></audio>
      {this.state.keyboard}
      </div>
    );
  }
}

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      power:true,
      volume:0.35,
      bank:'1',
      powerStyle:styles.innerSwitchLeft,
      bankStyle:styles.innerSwitchLeft
    };
    this.handlePowerSwitch=this.handlePowerSwitch.bind(this);
    this.handleSlider=this.handleSlider.bind(this);
    this.handleBankSwtich=this.handleBankSwtich.bind(this);
  }

  handlePowerSwitch(){
    if(this.state.power){
      this.setState({
        power:!this.state.power,
        powerStyle:styles.innerSwitchLeft
      });
    }else{
      this.setState({
        power:!this.state.power,
        powerStyle:styles.innerSwitchRight
      });
    }
    document.getElementById("screen").innerHTML="&ensp;";
  }

  handleSlider(event){
    this.setState({
      volume:event.target.value
    });
  }

  handleBankSwtich(){
    if(this.state.bank==='1'){
      this.setState({
        bank:'2',
        bankStyle:styles.innerSwitchRight
      });
      document.getElementById("screen").innerHTML=descriptions["KIT2"];
    }else{
      this.setState({
        bank:'1',
        bankStyle:styles.innerSwitchLeft
      });
      document.getElementById("screen").innerHTML=descriptions["KIT1"];
    }
    
  }

  render(){
    const drumPads=keyboards.map(key=>{
      return(
        <DrumPad key={key}
         keyboard={key} 
         power={this.state.power} bank={this.state.bank} volume={this.state.volume}/>
      )
    });
    return(
      <div className="App" id="drum-machine" style={styles.drumMachine}>
          <div id="drum-bank" style={styles.drumBank}>
            {drumPads}
          </div>
          <div id="logo" style={styles.logo}>
            Drum
          </div>
          <div id="controller" style={styles.controller}>
            <div id="power">
              Power
              <div className="switch" id="power-switch" style={styles.switch}
                  onClick={this.handlePowerSwitch}>
                <div className="inner-switch" style={this.state.powerStyle}></div>
              </div>
            </div>
            <div id="screen" style={styles.screen}>
              &ensp;
            </div>
            <div id="slider">
              <input type="range" step="0.01" min="0" max="1" value={this.state.volume}
                     onChange={this.handleSlider}></input>
            </div>
            <div id="bank">
              Bank
              <div className="switch" id="bank-switch" style={styles.switch}
                  onClick={this.handleBankSwtich}>
                <div className="inner-switch" style={this.state.bankStyle}></div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
