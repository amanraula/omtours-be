import { User } from "../models/user.model.js";


export async function search(req, res) {
    const { query } = req.params;
    try {      
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    name: query,
					// type: "start"
                },
            },
        });

        // Return actual search results instead of undefined response.results
        res.status(200).json({ 
            success: true, 
            content: [] // or your actual search results
        });
    } catch (error) {
        console.log("Error in search controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export async function removeItemFromSearchHistory(req, res) {
  try {
    const { name } = req.params; // Get the place name from query parameters
    const userId = req.user.id; // Assuming you have user authentication middleware

    // Validate input
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: "Place name is required" 
      });
    }

    // Find and update the user - remove the item from searchHistory array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $pull: { 
          searchHistory: name // Remove the specific place name from array
        } 
      },
      { 
        new: true, // Return the updated document
        runValidators: true 
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Place removed from search history successfully",
      searchHistory: updatedUser.searchHistory
    });

  } catch (error) {
    console.error("Error removing item from search history:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}
