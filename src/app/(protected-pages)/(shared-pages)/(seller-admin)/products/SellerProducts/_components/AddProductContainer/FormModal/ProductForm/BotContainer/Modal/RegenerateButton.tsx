import { Dispatch, SetStateAction } from "react";

function RegenerateButton({
  createAiDescriptionAction,
  setStreamDescription,
  setIsStreamingComplate,
  aiDescription,
}: {
  createAiDescriptionAction: () => Promise<void>;
  setStreamDescription: Dispatch<SetStateAction<string[]>>;
  setIsStreamingComplate: Dispatch<SetStateAction<boolean>>;
  aiDescription: string;
}) {
  const isErrorMessage = aiDescription.toLocaleLowerCase().includes("error");

  return (
    <button
      type="button"
      className={`btn w-full my-[1vh] ${
        isErrorMessage ? "btn-error" : "btn-success"
      }`}
      onClick={() => {
        setStreamDescription([]);
        setIsStreamingComplate(false);
        createAiDescriptionAction();
      }}
    >
      Regenerate
    </button>
  );
}
export default RegenerateButton;
