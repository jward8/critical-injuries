const { ApplicationCommandOptionType, Client, Interaction } = require('discord.js');
const Injury = require('../../models/injury');

module.exports = {
    name: 'add-injury',
    description: 'Adds an injury to the database',
    options: [
        {
            name: 'roll',
            description: 'The roll for the injury',
            required: true,
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: 'category',
            description: 'The category of the injury',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'injury-type',
            description: 'The type of injury',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'description',
            description: 'The description of the injury',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'lowest-cure',
            description: 'The lowest cure for the injury',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'duration',
            description: 'The duration of the injury',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'notes',
            description: 'Any notes for the injury',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'image',
            description: 'The image for the injury',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: async (client, interaction) => {
        let response = '';
        const roll = interaction.options.getInteger('roll');
        const category = interaction.options.getString('category');
        const injuryType = interaction.options.getString('injury-type');
        const description = interaction.options.getString('description');
        const lowestCure = interaction.options.getString('lowest-cure');
        const duration = interaction.options.getString('duration');
        const notes = interaction.options.getString('notes');
        const image = interaction.options.getString('image');

        const injuryEmbed = {
            color: 0x0099ff,
            title: `${category} - ${injuryType}`,
            url: 'https://discord.js.org',
            author: {
                name: 'Critical Injuries',
                icon_url: 'https://bg3.wiki/w/images/thumb/2/2f/Shocking_Grasp_Icon.webp/80px-Shocking_Grasp_Icon.webp.png',
                url: 'https://discord.js.org',
            },
            description: `${description}`,
            thumbnail: {
                url: `${image}`,
            },
            image: {
                url: `${image}`,
            },
            fields: [
                {
                    name: 'Lowest Cure',
                    value: `${lowestCure}`,
                },
                {
                    name: 'Duration',
                    value: `${duration}`,
                },
                {
                    name: 'Notes',
                    value: `${notes}`,
                },
            ],
            timestamp: new Date().toISOString(),
        }

        const injury = await Injury.findOne({ roll: parseInt(roll) });
        if (injury) {
            response = 'An injury with that roll already exists.';
        } else {
            const newInjury = new Injury({
                roll: parseInt(roll),
                category: category,
                injuryType: injuryType,
                description: description,
                lowestCure: lowestCure,
                duration: duration,
                notes: notes,
                image: image
            });
            await newInjury.save();
            response = { embeds: [injuryEmbed] };
        }
        interaction.reply(response);
    }
};