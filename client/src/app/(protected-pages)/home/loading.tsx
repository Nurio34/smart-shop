function LoadingPage() {
  return (
    <ul>
      <li className="mb-[2vh]">
        <div
          className="block max-w-max text-2xl font-bold mb-[1vh] capitalize bg-black"
          style={{ fontVariant: "small-caps" }}
        ></div>
        <ul
          className={`grid gap-x-[2vw] gap-y-[2vh] "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]`}
        >
          {Array(5)
            .fill("#")
            .map((_, index) => (
              <li
                key={index}
                className="overflow-hidden shadow-md p-[1vw] border rounded-md transition-all 
             hover:shadow-md hover:border hover:border-primary hover:shadow-primary hover:scale-105
           "
              >
                <div>
                  <h3 className="truncate font-semibold text-lg bg-blue-800">
                    title
                  </h3>
                  <figure className=" w-full aspect-square relative bg-black"></figure>
                  <p className=" truncate bg-blue-800">description</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    by
                    <div className="btn btn-sm btn-link p-1 capitalize bg-blue-800">
                      brand
                    </div>
                  </div>
                  <p className=" bg-blue-800">price</p>
                </div>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
}
export default LoadingPage;
