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
    <div className="flex h-[100px] justify-between flex-1 p-2 rounded-md shadow-md widget">
      <div className="flex flex-col items-center justify-around gap-2 p-2">
        <span className="text-xl font-semibold text-slate-500">{title}</span>
        <span className="text-2xl font-bold">{count}</span>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default Widget;
