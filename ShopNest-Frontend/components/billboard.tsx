import { Billboard as billboardProp } from "@/lib/StoreTypes";

interface BillboardProps {
  billboardData: billboardProp;
}

const Billboard: React.FC<BillboardProps> = ({
billboardData
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden ">
      <div
        className="rounded-xl relative  overflow-hidden bg-cover bg-center bg-no-repeat  w-1/2    "
        style={{ background: `url(${billboardData.imageUrl})`,  }}
      >
        <div className="w-full h-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl md:text-5xl lg:text-6xl sm:max-w-xl  max-w-xs ">
            {billboardData?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
