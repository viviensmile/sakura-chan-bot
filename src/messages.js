module.exports = {
  noPermission: () =>
    '🌸 桜ちゃん提醒你：\n這個指令只有管理成員可以使用喔~',

  processing: () =>
    '🌸 桜ちゃん正在幫你整理資料，請稍等一下~',

  emptyRole: roleName =>
    `🌸 桜ちゃん看了一下~\n【${roleName}】目前還沒有成員喔。`,

  successHeader: roleName =>
    `📋 桜ちゃん幫你整理好囉！\n【${roleName}】成員如下：`,

  tooManyMembers: () =>
    '🌸 桜ちゃん發現成員有點多，\n這次先幫你準備成檔案會比較清楚喔~'
};
