module.exports = class GuildMemberRemove extends Event {
  constructor() {
    super({
      name: "guildMemberRemove",
      once: false,
    });
  }
  async exec(member) {
    const data = await this.client.getGuild({ _id: member.guild.id });
  }
};
