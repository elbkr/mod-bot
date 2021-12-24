
module.exports = class GuildDelete extends Event {
  constructor() {
    super({
      name: "guildDelete",
      once: false,
    });
  }
  async exec(guild) {
    const data = await this.client.getGuild({ _id: guild.id });

    await data
      .delete()
      .catch((err) =>
        this.client.logger.error(
          `An error occurred when trying to trigger guildDelete event.\n${
            err.stack ? err + "\n\n" + err.stack : err
          }`,
          { tag: "guildDelete" }
        )
      );
  }
};
