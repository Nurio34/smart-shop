import { Dispatch } from "react";

import { SetStateAction } from "react";
import { ContainerSizeType } from "../..";

function Sizes({
  containerSize,
  setContainerSize,
}: {
  containerSize: ContainerSizeType;
  setContainerSize: Dispatch<SetStateAction<ContainerSizeType>>;
}) {
  return (
    <div className="flex items-center gap-x-[1vw] bg-base-content text-base-100 py-[1vh] px-[1vw] rounded-md">
      <label htmlFor="width">
        <p className=" font-semibold">Width</p>
        <input
          type="number"
          name="width"
          id="width"
          className="input input-sm input-bordered max-w-24  text-base-content"
          step={10}
          value={containerSize.width}
          onChange={(e) =>
            setContainerSize((prev) => ({ ...prev, width: +e.target.value }))
          }
        />
      </label>
      <label htmlFor="height">
        <p className=" font-semibold">Height</p>
        <input
          type="number"
          name="height"
          id="height"
          className="input input-sm input-bordered max-w-24  text-base-content"
          step={10}
          value={containerSize.height}
          onChange={(e) =>
            setContainerSize((prev) => ({ ...prev, height: +e.target.value }))
          }
        />
      </label>
    </div>
  );
}
export default Sizes;
