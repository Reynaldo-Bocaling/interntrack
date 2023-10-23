import React from "react";

function Information({ dataInfo }) {
  return (
    <div className="py-3 px-2">
      <div>
        {dataInfo?.map((info, index) => (
          <div key={index}>
            {info.title && (
              <h1
                className={`${
                  info.style && info.style
                } text-base font-semibold tracking-wide mb-3`}
              >
                {info.title}
              </h1>
            )}

            <div className="flex items-center justify-between my-4">
              <small className="text-gray-400 flex items-center gap-3">
                <info.icon /> {info.label}
              </small>
              <small className="font-semibold">{info.value}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Information;
