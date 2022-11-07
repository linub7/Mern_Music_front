import ClockLoader from 'react-spinners/ClockLoader';

const CustomSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-80">
      <ClockLoader size={40} color="#8e44ad" />
    </div>
  );
};

export default CustomSpinner;
