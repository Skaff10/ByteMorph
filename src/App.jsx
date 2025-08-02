import { useState } from "react";
import Navbar from "./Components/Navbar";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImages } from "react-icons/fa";

import ToText from "./Components/ToText";
import Formater from "./Components/Formater";
import Merger from "./Components/Merger";
import Tools from "./Components/Tools";
const App = () => {
  const [toolName, setToolName] = useState("Pdf to text");
  const [hidden, setHidden] = useState(true);
  const toolLogos = [
    <IoDocumentTextOutline />,
    <FaRegFilePdf />,
    <FaRegImages />,
  ];
  const [index, setIndex] = useState(0);
  let content;
  if (toolName == "Pdf to text") content = <ToText />;
  else if (toolName == "Image Converter") content = <Formater />;
  else if (toolName == "Pdf Merger") content = <Merger />;

  return (
    <div>
      <Navbar
        toolName={toolName}
        setToolName={setToolName}
        toolLogos={toolLogos}
        index={index}
        setHidden={setHidden}
      />
      <Tools
        hidden={hidden}
        toolLogos={toolLogos}
        setToolName={setToolName}
        setIndex={setIndex}
      />
      {content}
    </div>
  );
};
export default App;
