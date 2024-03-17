const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Your OpenAI API key
const apiKey = 'rnd_Nc2KyVdBccOSjkD6b3YOY0ca9lCx';

// Endpoint to handle API requests
app.get('/api/completions', async (req, res) => {
    try {
        // Get the prompt from the query parameter
        const { prompt } = req.query;

        // Make the request to the OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: prompt,
                model: 'text-davinci-002', // Or any other model you prefer
                max_tokens: 50 // Adjust based on your needs
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Send the response from OpenAI API to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response.data);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});