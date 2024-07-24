import React, { useEffect, useState } from "react";

const Widget = ({ title, children, fetchCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      try {
        const count = await fetchCount();
        setCount(count);
      } catch (error) {
        console.log(error);
      }
    };
    getCount();
  }, [fetchCount]);

  return (
    <div className="flex h-[100px] justify-center gap-4 flex-1 p-2 rounded-md shadow-md widget">
      <div className="flex flex-col items-center justify-around p-2">
        <span className="text-2xl font-bold">{count}</span>
        <hr className="w-full text-black" />
        <span className="text-sm font-semibold text-slate-500">
          Total {title}
        </span>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default Widget;
