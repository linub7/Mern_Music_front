import CustomButton from './CustomButton';

const PageHeader = ({ header, onClick, btnTitle }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h1 className="text-slate-700 text-xl font-semibold">{header}</h1>
      <CustomButton btnTitle={btnTitle} onClick={onClick} />
    </div>
  );
};

export default PageHeader;
