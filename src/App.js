import React from 'react';
import './App.css';
import Weather from './weather.components/weather.component';
import 'weather-icons/css/weather-icons.css';
import Form from './weather.components/form.component';


const key = "b3fef79d1e7662cdb8177624751f17f3";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      input:'',
      city:'City',
      country:'Country',
      icon:'',
      temperature:'--',
      description:'',
      error:false,
    }
    
    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }

  getWeatherIcon(icons,rangeID){
    switch(true){
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.weatherIcon.Thunderstorm});
        break;
      case rangeID>=300 && rangeID<=321:
        this.setState({icon:this.weatherIcon.Drizzle});
        break;
      case rangeID>=500 && rangeID<=531:
        this.setState({icon:this.weatherIcon.Rain});
        break;  
      case rangeID>=600 && rangeID<=622:
        this.setState({icon:this.weatherIcon.Snow});
        break;   
      case rangeID===800:
        this.setState({icon:this.weatherIcon.Clear});
        break;
      case rangeID>=801 && rangeID<=804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;    
    }
  }

  handleChange= e =>{
    e.preventDefault();
    if (e.keyCode===13){console.log('enter')}
    else{
      this.setState({
        input:e.target.value
      })
    }
    
  }

  getWeather = async(e) =>{

    e.preventDefault();
    
    const city = this.state.input;
    
    if(city){
    try{const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    console.log(api_call);
    if (!api_call.ok){
      if (api_call.status>=500&&api_call.status<=599)
        alert('Server error');
      else if (api_call.status>=400&&api_call.status<=499) {
        alert('City Not Found');
      }
      throw new Error(api_call.status);
    }
    const data = await api_call.json();
      
    console.log(data);
      
    this.setState({
      input:'',
      city: data.name,
      country:data.sys.country,
      temperature:Math.floor(data.main.temp-273),
      description: data.weather[0].description,
      error:false,
    })
    this.getWeatherIcon(this.weatherIcon,data.weather[0].id);}

    catch(error){
      console.log(error.message);
      this.setState({
        input:'',
        city:'City',
        country:'Country',
        icon:'',
        temperature:'--',
        description:'',
        error:true})
    }
    }
    else{
      this.setState({
        error: true
      })
    }
  }

  render(){
    return(
      <div className="App">
        <div className='container'>
        <Form 
          input={this.state.input} 
          handleChange={this.handleChange} 
          loadWeather={this.getWeather}
          error={this.state.error}
         />  
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temperature={this.state.temperature} 
          description={this.state.description}
          weatherIcon={this.state.icon}/>
          </div>
    </div>
    )
  }
}


export default App;