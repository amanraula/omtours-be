import express from "express";
const router = express.Router();
import axios from "axios";

let placestovisit="test";
// Route to handle the form submission
router.post('/', async (req, res) => {
  try {
    // Access the form data from the request body
    const formData = req.body;
    
    // Log the received data for debugging
    console.log('Received form data:', formData);
    
    // Validate the form data (basic example)
    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ 

        success: false,
        message: 'No form data received' 
      });
    }

    placestovisit=`Please make me a travel itenary for my trip from ${formData.source} to ${formData.destination} starting from ${formData.dateFrom} to ${formData.dateTo} (given in yyyy-mm-dd). I would like to visit ${formData.interests}.Also please keep in mind my budget is ${formData.budget} and I would like to stay in a ${formData.hotelPreference} hotel and I prefer travelling by ${formData.travelMode} and  ${formData.groupType}.My dietary preference are ${formData.dietaryPreferences}.I also have some special reqirements like :${formData.specialRequirements}.Please keep the itenary date wise with sub divisions for Detailed time of the day.Plese dont mention the obvious things like booking tickets and hotels etc in advance or general considerations like respecting local customs.`;
    // console.log(placestovisit);
    /* */
    const geminiResponse = await axios.post("http://localhost:8000/gemini/generate", {
        prompt: placestovisit,
      });
    
  //console.log("Gemini API Response:", geminiResponse.data);
    /* */

    /**/
    const currentwet = await axios.post("http://localhost:8000/weather/currentwet", {
        location:formData.destination,
      });
    console.log("/******/");
    // console.log("weather api response:", currentwet.data);
    console.log("weather api response:", {
      location: {
        name: currentwet.data.location.name,
        region: currentwet.data.location.region,
        country: currentwet.data.location.country,
        lat: currentwet.data.location.lat,
        lon: currentwet.data.location.lon,
        localtime: currentwet.data.location.localtime
      },
      current: {
        temp_c: currentwet.data.current.temp_c,
        condition: currentwet.data.current.condition,
        wind_kph: currentwet.data.current.wind_kph,
        humidity: currentwet.data.current.humidity
      }
    });
    /* */
    /**/
    const futurewet = await axios.post("http://localhost:8000/weather/futurewet", {
      location:formData.destination,
    });
  console.log("/******/");
  // console.log("weather api response:", currentwet.data);
  console.log(`Future weather api response for :${futurewet.data.location.localtime}`, {
    location: {

      name: futurewet.data.location.name,
      region: futurewet.data.location.region,
      country: futurewet.data.location.country,
      lat: futurewet.data.location.lat,
      lon: futurewet.data.location.lon,
      
    },
    current: {
      temp_c: currentwet.data.current.temp_c,
      condition: currentwet.data.current.condition,
      wind_kph: currentwet.data.current.wind_kph,
      humidity: currentwet.data.current.humidity
    }
  });
    /**/



    
    res.status(200).json({ 
      success: true,
      message: 'Plan data received and processed successfully',
      data: formData 
    });
 
   
    
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while processing plan data',
      error: error.message 
    });
  }
});







export default router;