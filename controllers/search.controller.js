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

export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params;

	id = parseInt(id);

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
