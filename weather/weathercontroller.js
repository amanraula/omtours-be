import fetch from 'node-fetch';
export async function currentwet(req, res) {
    const apiKey = 'c7c3d90d6b1a4af192253708252903'; // Replace with your actual API key
    const location = req.body.location; // Use req.body directly

    if (!location) {
        return res.status(400).json({ error: 'Location is required in the request body.' });
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch weather data.' });
        }

        const data = await response.json();
        res.status(200).json(data);
        //console.log(data);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
}
export async function futurewet(req, res) {
    const apiKey = 'c7c3d90d6b1a4af192253708252903'; // Replace with your actual API key
    const location = req.body.location; // Use req.body directly

    if (!location) {
        return res.status(400).json({ error: 'Location is required in the request body.' });
    }

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=4`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch future weather data.' });
        }

        const data = await response.json();
        res.status(200).json(data);
        //console.log(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching future' });
    }
}

// export default currentwet;
