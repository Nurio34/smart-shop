function SubmitButton({
  isSubmitting,
  error,
}: {
  isSubmitting: boolean;
  error: string;
}) {
  return (
    <button
      type="submit"
      className={`btn ${error ? "btn-error" : "btn-primary"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <div className=" flex items-center gap-x-[1vw]">
          <p>Creating..</p>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        error || "Create Product"
      )}
    </button>
  );
}
export default SubmitButton;
