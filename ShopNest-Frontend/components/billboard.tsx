import { Billboard as BillboardProp } from "@/lib/StoreTypes";

interface BillboardProps {
  billboardData: BillboardProp;
}

const Billboard: React.FC<BillboardProps> = ({ billboardData }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden rounded-xl">
      <div
        className="rounded-xl relative overflow-hidden aspect-square md:aspect-[2.4/1] w-full"
        style={{ height:'300px',background: `url(${billboardData?.imageUrl}) center center / cover no-repeat`,  }}
      > 
        <div className="flex h-full w-full items-center justify-center text-center">
          <div className="font-bold text-white text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs ">
            {billboardData?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
