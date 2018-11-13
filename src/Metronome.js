import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  _handleBpmChange = (event) => {
    const bpm = event.target.value;
    this.setState({ bpm });
  }

  _playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0 ) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  _startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(
        this._playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        playing: true,
      }, this._playClick);
    }
  }

  render() {

    const { playing, bpm } = this.state;

    return(
      <div className="metronome">
        <h1>Young Metro(nome)</h1>
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange= {this._handleBpmChange} />
        </div>
        <button onClick={this._startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;
