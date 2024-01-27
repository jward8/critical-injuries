const { ApplicationCommandOptionType, Client, Interaction } = require('discord.js');
const Injury = require('../../models/injury');

module.exports = {
    name: 'roll-injury',
    description: 'Rolls d100 for an injury',
    options: [],

    callback: async (client, interaction) => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;

        const injury = await Injury.findOne({ roll: randomNumber });
        
        const rollEmbed = {
            color: 0x0099ff,
            title: `${injury.category} - ${injury.injuryType}`,
            url: 'https://discord.js.org',
            author: {
                name: 'Critical Injuries',
                icon_url: 'https://bg3.wiki/w/images/thumb/2/2f/Shocking_Grasp_Icon.webp/80px-Shocking_Grasp_Icon.webp.png',
                url: 'https://discord.js.org',
            },
            description: `${injury.description}`,
            thumbnail: {
                url: `${injury.image}`,
            },
            image: {
                url: `${injury.image}`,
            },
            fields: [
                {
                    name: 'Lowest Cure',
                    value: `${injury.lowestCure}`,
                },
                {
                    name: 'Duration',
                    value: `${injury.duration}`,
                },
                {
                    name: 'Notes',
                    value: `${injury.notes}`,
                },
            ],
            timestamp: new Date().toISOString(),
        }

        interaction.reply({ embeds: [rollEmbed] });
    }
};