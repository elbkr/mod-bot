module.exports = class Unset extends Interaction {
  constructor() {
    super({
      name: "unset",
      description: "Unset a config value",
      options: [
        {
          type: "3",
          name: "function",
          description: "The function to unset",
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
      ],
    });
  }
  async exec(int, data) {
    const option = int.options.getString("function");

    if (!int.member.permissions.has("MANAGE_GUILD")) {
      return int.reply({
        content: "You don't have permission to do that!",
        ephemeral: true,
      });
    }

    if (option === "logs") {
      data.logsChannel = null;
      await data.save();

      return int.reply({
        content: "Logs channel unset!",
        ephemeral: true,
      });
    }
    if (option === "mod-logs") {
      data.modLogs = null;
      await data.save();

      return int.reply({
        content: "Mod logs channel unset!",
        ephemeral: true,
      });
    }
  }
};
