import { Dna } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loading;
