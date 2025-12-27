# 🌸 sakura-chan-bot
A gentle and reliable Discord bot for managing server members and roles, making administration clear and hassle-free.

---

## 🔹 Features
- List all members of a specific role (`/rolelist @Role`)  
- Interactive deletion of global commands
- Simple setup and deployment
- Cute and consistent Sakura-chan personality responses  

---

## 🔹 Requirements
- Node.js v18+
- Discord.js v14
- A Discord Bot with **Application (Bot) Token** and **Application ID**

---

## 🔹 Project Structure
```
sakura-chan-bot/
├─ node_modules/                   # NPM packages
├─ src/                            # Main bot logic
│   ├─ index.js                    # Main bot logic
│   └─ messages.js                 # Sakura-chan fixed responses / templates
├─ .env                            # Bot token, Application ID, optional TEST_GUILD_ID
├─ .gitignore                      
├─ delete-commands-interactive.js  # Interactive global commands deletion
├─ deploy-commands.js              # Global slash commands deployment
├─ index.js                        # Root index, just requires ./src/index.js
├─ package-lock.json               
├─ package.json                     # Scripts & dependencies
└─ README.md                        # Project instructions
```

---

## 🔹 Installation
1. Clone this repository:
```bash
git clone https://github.com/yourusername/sakura-chan-bot.git
cd sakura-chan-bot
```

1. Install dependencies:
```bash
npm install
```

1. Create a `.env` file in the root:
```env
DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
APPLICATION_ID=YOUR_APPLICATION_ID
```

1. Start the bot:
```bash
npm start
```

---

## 🔹 Scripts
Your `package.json` should include:
```json
"scripts": {
  "start": "node index.js",                 // Start the bot
  "deploy-commands": "node deploy-commands.js", // Deploy global slash commands
  "delete-commands": "node delete-commands-interactive.js" // Delete global commands interactively
}
```

---

## 🔹 Running the Bot
```bash
npm start
```

- The bot will connect to your servers and listen for slash commands.

---

## 🔹 Commands Deployment & Deletion
1. Deploy Global Commands
```bash
npm run deploy-commands
```

- Registers all global slash commands defined in `deploy-commands.js`.
- ⚠️ Global commands may take up to **1 hour** to appear for all server members.

1. Delete Old Global Commands (Interactive)
```
npm run delete-commands
```

- Lists all global commands with numbers.
- Enter the number(s) to delete a specific command.
- Enter `all` to delete all global commands.

Example interaction:

```shell
🌸 Global commands list:
1. rolelist (id: 123456)
2. ping (id: 234567)
Enter the numbers of the commands to delete (comma separated), or type "all" to delete all: 1
🌸 Deleted command: rolelist (id: 123456)
🌸 Deletion complete!
```

---

## 🔹 Commands
- `/rolelist @Role` → Display all members with the specified role
- Sakura-chan always responds in her cute, friendly tone

---

## 🔹 Sakura-chan Fixed Responses Example
```js
// Example fixed responses in messages.js
const messages = [
  "🌸 Sakura-chan is here! How can I help today?",
  "🌸 Everything is organized, don't worry!",
  "🌸 Did someone call for me?",
];
```

- Responses are consistent and polite, keeping the bot personality cute but professional.

---

## 🔹 Notes
- `.env` is required and must **never** be uploaded to GitHub
- Bot Token is sensitive, Application ID and Public Key can be stored in code if needed
- Make sure **Server Members Intent** is enabled in Developer Portal
- To make command messages visible to everyone, make sure ephemeral **is false** in your command reply