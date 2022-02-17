import axios from 'axios';

//Get API Key from .env
const { REACT_APP_NOMICS_API_KEY } = process.env || process.env.REACT_APP_NOMICS_API_KEY

const cryptoCurrency = async () => {

    //Set URL
    let nomicsURL = `https://api.nomics.com/v1/currencies/ticker?key=${REACT_APP_NOMICS_API_KEY}&ids=SOL&interval=1h`;
    let response;
    console.log(nomicsURL);

    //Axios call to get current crypto data
    try {
        response = await axios.get(nomicsURL)
    } catch(e){
        console.log(e);
        response = []
    }
    
    console.log(response.data[0].price);
    
    return response.data[0].price;

}

export default cryptoCurrency;