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

    placestovisit=`Suggest me places to visit in ${formData.destination} Numbered and Formatted each and with Short description `;
    console.log(placestovisit);
    /* */
    const geminiResponse = await axios.post("http://localhost:5000/ask/gemini", {
        prompt: placestovisit,
      });
    
    //   console.log("Gemini API Response:", geminiResponse.data);
    /* */

    /**/
    const currentwet = await axios.post("http://localhost:5000/ask/currentwet", {
        location:formData.destination,
      });
    
      console.log("Gemini API Response:", currentwet.data);
    /* */



    
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