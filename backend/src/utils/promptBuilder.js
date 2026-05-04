const { itContent, normalWebContent,itContentModify } = require("./promptContent");

const simpleBuildMessage = (userQuery) => {
  return [
    {
      content:
        "You are a Smart perosnal Assistant who answer to question and your answer will be short",
      role: "system",
    },
    {
      content: userQuery,
      role: "user",
    },
  ];
};

// Currently using this one //
const webBuildMessage = (userQuery) => {
  const contentPromptIt = itContentModify();
  return [
    {
      role: "system",
      content: contentPromptIt,
    },
    {
      content: userQuery,
      role: "user",
    },
  ];
};



module.exports = {
  simpleBuildMessage,
  webBuildMessage,
};
