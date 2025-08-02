import { GiAnarchy } from "react-icons/gi";
const Navbar = ({ toolName, setHidden, toolLogos ,index}) => {
  const handleClick = () => {
    setHidden((prev) => !prev);
  };

  return (
    <nav className="bg-blue-300 -mt-2 h-13 flex justify-between items-center">
      <div className="flex gap-0.5 mt-2">
        <GiAnarchy className="h-6 size-5" />
        <h3 className="">ByteMorph</h3>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {toolLogos[index]}
        {toolName}
      </div>
      <div className="cursor-pointer mr-1" onClick={handleClick}>
        Tools
      </div>
    </nav>
  );
};
export default Navbar;
