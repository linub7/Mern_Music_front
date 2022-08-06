const CustomButton = ({ onClick, btnTitle, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 text-white p-2 rounded hover:text-purple-100 transition"
    >
      {btnTitle}
    </button>
  );
};

export default CustomButton;
