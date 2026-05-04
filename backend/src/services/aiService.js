const { groq } = require("../config/aiClient");
const {simpleBuildMessage} = require("../utils/promptBuilder");
const getChatResponse = async (userMessage) => {
  const messages = simpleBuildMessage(userMessage);
  try {
    const response = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile", // -->Use of Basic Model //
      temperature: 0,
    });
    return {
      success: true,
      message: response.choices[0].message.content,
    };
  } catch (error) {
    //console.error("Full Error:", error);
    return {
      success: false,
      message:
        error?.error?.error?.message ||
        "AI Service Unavailable,Something is Wrong",
    };
  }
};

module.exports = getChatResponse;
