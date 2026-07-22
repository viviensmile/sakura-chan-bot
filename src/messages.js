// Centralized bot version number
// Update this when releasing a new version
const BOT_VERSION = 'v0.0.4';

module.exports = {
  BOT_VERSION,

  // Permission denied message
  noPermission: () =>
    '🌸 桜ちゃん提醒你：\n' +
    '這個指令只有管理成員可以使用喔~',

  // Processing / loading message
  processing: () =>
    '🌸 桜ちゃん正在幫你整理資料，請稍等一下~',

  // Message when the role has no members
  emptyRole: roleName =>
    '🌸 桜ちゃん看了一下~\n' +
    `【${roleName}】目前還沒有成員喔。`,

  // Header for successful role member listing
  successHeader: (roleName, time) =>
    '來了來了~~  桜ちゃん幫你整理好囉 ❥(ゝω・✿ฺ)\n' +
    `現在時間: ${time} -- (UTC+8)\n` +
    `【${roleName}】成員如下：`,

  // Message shown when the member list exceeds Discord message length limit
  tooManyMembers: () =>
    '🌸 桜ちゃん發現成員有點多，\n' +
    '這次先幫你準備成檔案會比較清楚喔~',

  // /bot-version response message
  versionInfo: () =>
    'はじめまして！🌸\n' +
    '私は「桜ちゃん」です。(๑＞ڡ＜)✿\n\n' +
    'このサーバーを少しでも便利で楽しくするために作られました。\n' +
    'まだまだ勉強中ですが、よろしくお願いします！\n\n' +
    `📦 Version: ${BOT_VERSION}`,

  // /clean-role start message
  cleanRoleStart: roleName =>
    '等等哦~~~ 桜ちゃん確認一下這個身分組 -\n' +
    `【${roleName}】 有哪些成員 (๑•́ ₃ •̀๑)`,

  // Message shown before removing all members from the role
  cleaningNotice: time =>
    `現在時間: ${time} -- (UTC+8)\n` +
    '本週公會副本隊伍安排已完成，正在清理該身分組參加的成員 🧹 ✨ ⏳ ',

  // Message shown after cleanup is complete
  cleanDone: '處理完畢!! (<ゝω・)☆',

  raidThreadMessage: () =>
    '想參加突襲的孩子們，留一下這週方便的時間吧 ~ (ゝ∀･)⌒☆',

  raidRoleReminder: () =>
    '📢 還沒有領取突襲身分組的孩子，可以到 <#1452710373781143745> 領一下，之後每週開團就會收到通知啦 ✨\n' +
    '如果最近想休息一下，或是不想被 @，也可以到同一個頻道把身分組移除，不會有人介意的 (｡•ㅅ•｡)♡',

  raidThreadCreated: thread =>
    `🌸 突襲遠征隊討論串已經建立好囉：${thread}`
};
