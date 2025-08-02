import React, { useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ToText = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setText("");

    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        // Group items by their y position (line)
        const lines = {};
        content.items.forEach((item) => {
          const y = Math.round(item.transform[5]); // y position
          if (!lines[y]) lines[y] = [];
          lines[y].push(item.str);
        });

        // Sort lines by y position (top to bottom)
        const sortedY = Object.keys(lines)
          .map(Number)
          .sort((a, b) => b - a); // PDF y=0 is bottom, so reverse

        // Join items in each line, then join lines
        const pageText = sortedY.map((y) => lines[y].join(" ")).join("\n");

        fullText += pageText + "\n\n";
      }

      setText(fullText);
      setLoading(false);
    };

    fileReader.readAsArrayBuffer(file);
  };
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <label className="block mb-2 font-semibold">
        Upload PDF to extract text:
      </label>
      <button
        type="button"
        className="mb-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => fileInputRef.current.click()}
      >
        Choose PDF
      </button>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {fileName && (
        <div className="mb-2 text-sm text-gray-600">Selected: {fileName}</div>
      )}
      {loading && (
        <div className="mb-2 text-blue-500">
          Extracting text, please wait...
        </div>
      )}
      <textarea
        className="w-full h-96 mt-4 p-2 border rounded"
        value={text}
        readOnly
      />
    </div>
  );
};

export default ToText;
