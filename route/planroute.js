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

    const placestovisit = `
    Generate a travel itinerary for a trip from ${formData.source} to ${formData.destination}, 
    starting from ${formData.dateFrom} to ${formData.dateTo} (dd-mm-yyyy). 
    The itinerary should:
    - Be provided **strictly in JSON format**.
    - Include suggested hotels based on my budget **(${formData.budget})** and preference **(${formData.hotelPreference})**.
    - Recommend places to visit based on their **proximity to each other**.
    - Keep the itinerary **date-wise**, and within each day, **divide activities into 5-6 time blocks** (morning, late morning, afternoon, evening, and night).
    - For each time block, mention:
      - The location
      - Activities planned
      - Expected duration
      - Alternative options (if any)
    - Keep in mind my dietary preference **(${formData.dietaryPreferences})**.
    - Avoid general tips like booking tickets in advance.
    - Return the **output in a structured JSON format**:
      
    give a json string which i can recover by parsing, and no other text:
    {
      "tripTitle": "Trip to ${formData.destination}",
      "days": [
        {
          "date": "yyyy-mm-dd",
          "blocks": [
            {
              "time": "Morning",
              "location": "Place Name",
              "activities": ["Activity 1", "Activity 2"],
              "alternative": ["Alt Activity 1", "Alt Activity 2"]
            },
            {
              "time": "Afternoon",
              "location": "Place Name",
              "activities": ["Activity 1"],
              "alternative": ["Alt Activity"]
            }
          ]
        }
      ]
    }
    `;

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