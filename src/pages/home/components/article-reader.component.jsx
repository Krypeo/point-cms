import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Line } from 'react-chartjs-2';

const style = [];
const BarChartData = {
  labels: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
  datasets: [
    {
      label: 'Doplnit',
      data: [
        152,
        111,
        173,
        120,
        98,
        200,
        147,
        186,
        155,
        117,
        101,
        250,
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
      ]
    }
  ]
};

@inject('settings') @inject('loc') @observer
class ArticlesReader extends Component {
  state = {
    chartData: BarChartData
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'top',
    location: 'City'
  }

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }
  
  render() {
    const { loc } = this.props;
    const locString = loc.strings.Home;

    return (
      <Line
        data={this.state.chartData}
        options={{
          title: {
            display: this.props.displayTitle,
            text: locString.sentences.Article_Reader_Graph,
            fontSize: 17
          },
          legend: {
            display: this.props.displayLegend,
            position: this.props.legendPosition
          }
        }}
      />
    )
  }
}

export default injectSheet(style)(ArticlesReader);