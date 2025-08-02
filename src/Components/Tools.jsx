const Tools = ({ hidden, toolLogos, setToolName, setIndex }) => {
  return (
    <div className={`relative ${hidden ? "hidden" : "block"}`}>
      <div className="absolute right-0 top-0 w-60 border-2 border-amber-950 bg-white shadow-md">
        <div
          className="flex items-center gap-1 ml-0.5 justify-start cursor-pointer"
          onClick={() => {
            setToolName("Pdf to text");
            setIndex(0);
          }}
        >
          {toolLogos[0]} Pdf to Text
        </div>
        <div
          className="flex items-center gap-1 ml-1 justify-start cursor-pointer"
        onClick={() => {setToolName("Pdf Merger")
          setIndex(2);
        }}
        >
          {toolLogos[1]} Pdf Merger
        </div>
        <div
          className="flex items-center gap-1 ml-1 justify-start cursor-pointer"
          onClick={() => {setToolName("Image Converter")
            setIndex(1);
          }}
        >
          {toolLogos[2]} Image Converter
        </div>
      </div>
    </div>
  );
};
export default Tools;
