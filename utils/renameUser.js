const renameUser = async (interaction, newName) => {
    try {
        const member = await interaction.guild.members.fetch(
            interaction.user.id
        );
        await member.setNickname(`${newName}`);
        return "OK";
    } catch (error) {
        console.log(error.rawError.message);
        return error.rawError.message;
    }
};

module.exports = renameUser;
