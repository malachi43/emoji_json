# Fetching Emojis from Emoji API and Storing in EMOJI.json

This project demonstrates how to fetch emojis from the [Emoji API](https://emoji-api.com/) and store the data in a JSON file named `EMOJI.json`. The JSON file includes properties such as the number of emojis and their respective categories.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)

You also need an API key from [Emoji API](https://emoji-api.com/). Sign up and obtain an API key to use the service.

## Fetching and Writing Emojis

### Using JavaScript (Node.js)

1. Install dependencies if not already installed:
   ```sh
   npm install axios dotenv
   ```
2. Create a script (e.g., `fetchEmoji.js`) and add the following code:

   ```javascript
   require("dotenv").config();
   const axios = require("axios");
   const fs = require("fs");
   const path = require("path");

   const apiKey = process.env.EMOJI_API_KEY;
   const allEmojisUrl = `https://emoji-api.com/emojis?access_key=${apiKey}`;
   const emojiCategoryUrl = `https://emoji-api.com/categories?access_key=${apiKey}`;

   async function fetchEmoji() {
       try {
           const allEmojis = await axios.get(allEmojisUrl);
           const allCategory = await axios.get(emojiCategoryUrl);

           const emojis = allEmojis.data.map(({ slug, character }) => {
               // Remove string starting with e1-0- or e14-3- signature
               const regex = /^e[0-9]+-[0-9]+-/i;
               const newSlug = slug.replace(regex, "");
               return { name: newSlug, emoji: character };
           });

           const categories = allCategory.data.map(({ slug }) => slug);

           const emojiObj = {
               data: emojis,
               num_of_emojis: emojis.length,
               emoji_categories: categories
           };

           const filename = "EMOJI.json";
           fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(emojiObj, null, 2), { encoding: "utf-8" });

           console.log("Emojis successfully written to EMOJI.json");
       } catch (error) {
           console.error("Error fetching emojis:", error);
       }
   }

   fetchEmoji();
   ```

3. Create a `.env` file in the root directory and add your API key:
   ```env
   EMOJI_API_KEY=your_api_key_here
   ```

4. Run the script:
   ```sh
   node fetchEmoji.js
   ```

## EMOJI.json Structure

After executing the script, the `EMOJI.json` file will be generated with a structure similar to:

```json
{
  "data": [
    {
      "name": "flag-england",
      "emoji": "🏴"
    }
  ],
  "num_of_emojis": 1859,
  "emoji_categories": [
    "smileys-emotion",
    "people-body",
    "component",
    "animals-nature",
    "food-drink",
    "travel-places",
    "activities",
    "objects",
    "symbols",
    "flags"
  ]
}
```

## Conclusion

This project provides a simple way to fetch emojis from an API and store them in a structured JSON file. You can use this data for various applications, including chat interfaces, emoji search tools, and more!

