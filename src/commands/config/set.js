module.exports = class SetFunction extends Interaction {
  constructor() {
    super({
      name: "set",
      description: "Set a config value",
      options: [
        {
          type: "3",
          name: "function",
          description: "The function to set",
          required: true,
          choices: [
            {
              name: "Server logs channel",
              value: "logs",
            },
            {
              name: "Moderation logs channel",
              value: "mod-logs",
            },
          ],
        },
        {
          type: "7",
          name: "channel",
          description: "The channel or category to set the function to",
          required: true,
        },
      ],
    });
  }
  async exec(int, data) {
    const option = int.options.getString("function");
    const channel = int.options.getChannel("channel");

    if (!int.member.permissions.has("MANAGE_GUILD")) {
      return int.reply({
        content: "You don't have permission to do that!",
        ephemeral: true,
      });
    }

    if (channel.type === "GUILD_CATEGORY") {
      return int.reply({
        content: "The channel type must be a text channel!",
        ephemeral: true,
      });
    } else if (channel.type === "GUILD_VOICE") {
      return int.reply({
        content: "The channel type must be a text channel!",
        ephemeral: true,
      });
    }


    if (option === "logs") {
      data.logsChannel = channel.id;
      await data.save();

      return int.reply({
        content: `Set the logs channel to ${channel}`,
        ephemeral: true,
      });
    }
    if (option === "mod-logs") {
      data.modLogs = channel.id;
      await data.save();

      return int.reply({
        content: `Set the moderation logs channel to ${channel}`,
        ephemeral: true,
      });
    }
  }
};
