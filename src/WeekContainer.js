import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './Card';

    class WeekContainer extends React.Component {
        state = {
            fullData: [],
            dailyData: []
        }
        componentDidMount = () => {
            const weatherURL =
            `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.myKey}`

            fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            this.setState({
                fullData: data.list,
                dailyData: dailyData
            }, () => console.log(this.state))
        })
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    }    
    render() {
        return (
            <div className="container">
                <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
                <h4 className="display-4 text-muted">Dallas, US</h4>
                    <div className="row justify-content-center">
                        {this.formatDayCards()}
                    </div>
            </div>
        )
    }
}

// const weatherURL =
//         `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.myKey}`

// class WeekContainer extends React.Component {
//     state = {
//         days: []
//     }
//     componentDidMount = () => {

//         fetch(weatherURL)
//         .then(res => res.json())
//         .then(data => {
//             console.log("Data list loaded", data.list)
//             const dailyData = data.list.filter(reading => {
//             return reading.dt_txt.includes("18:00:00")})
//             this.setState({ days: dailyData})
//         })
//     }
// formatCards = () => {
//     return this.state.days.map((day, index) => <Card day={day} key={index}/>)
// }

export default WeekContainer;