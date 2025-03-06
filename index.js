require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const apiKey = process.env.EMOJI_API_KEY;
const path = require("path");

const allEmojisUrl = `https://emoji-api.com/emojis?access_key=${apiKey}`;
const emojiCategoryUrl = `https://emoji-api.com/categories?access_key=${apiKey}`;

async function fetchEmoji() {

    const allEmojis = await axios.get(allEmojisUrl);
    const allCategory = await axios.get(emojiCategoryUrl);

    const emojis = allEmojis.data.map(({ slug, character }) => {


        //remove string starting with e1-0- or e14-3- signature
        const regex = /^e[0-9]+-[0-9]+-/i
        const newSlug = slug.replace(regex, "");

        return { name: newSlug, emoji: character };

    })

    const categories = allCategory.data.map(({ slug, subCategories }) => {
        return slug
    })

    const emojiObj = {}
    emojiObj.data = emojis
    emojiObj.num_of_emojis = emojis.length;
    emojiObj.emoji_categories = categories

    const filename = "EMOJI.json";

    fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(emojiObj, null, 2), { encoding: "utf-8" });
}

fetchEmoji();



