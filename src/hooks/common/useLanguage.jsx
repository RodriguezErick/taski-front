import { useState, useEffect } from "react";
import { messages } from "../../utils/languages";

export const useLanguage = () => {
  const [text, setText] = useState(messages.en); // default
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLang = navigator.language.startsWith("es") ? "es" : "en";
    setLang(browserLang);
    setText(messages[browserLang]);
  }, []);

  const changeLanguage = (newLang) => {
    if (messages[newLang]) {
      setLang(newLang);
      setText(messages[newLang]);
    }
  };

  return { text, lang, changeLanguage };
};