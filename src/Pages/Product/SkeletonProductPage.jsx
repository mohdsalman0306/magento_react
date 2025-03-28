const SkeletonProductPage = () => {
  return (
    <>
      <div className="bg-white">
        <div className="pt-6 space-y-4 animate-pulse">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li className="bg-gray-300 w-14 h-1">
                <div className="flex items-center">
                  {/* <a
                    href="#"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Men
                  </a> 
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg> */}
                </div>
              </li>
              <li className="bg-gray-300 w-14 h-1">
                <div className="flex items-center">
                  {/* <a
                    href="#"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Clothing
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg> */}
                </div>
              </li>

              <li className="text-sm bg-gray-300 w-14 h-1">
                {/* <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  Basic Tee 6-Pack
                </a> */}
              </li>
            </ol>
          </nav>

          {/* <!-- Image gallery --> */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="hidden size-full rounded-lg object-cover lg:block bg-gray-300 w-96 h-96"></div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-3/2 rounded-lg object-cover bg-gray-300 w-96 "></div>
              <div className="aspect-3/2 rounded-lg object-cover bg-gray-300 w-96"></div>
            </div>
            <div className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto bg-gray-300 w-96"></div>
          </div>

          {/* <!-- Product info --> */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl rounded-lg bg-gray-300 w-96 h-8">
                {/* Basic Tee 6-Pack */}
              </h1>
            </div>

            {/* <!-- Options --> */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <p className="text-3xl tracking-tight text-gray-900 rounded bg-gray-300 w-56 h-8"></p>

              {/* <!-- Reviews --> */}
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex items-center rounded bg-gray-300 w-32 h-4"></div>
                  <p className="sr-only rounded bg-gray-300 w-32 h-4">
                    {/* 4 out of 5 stars */}
                  </p>
                  <a
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 rounded bg-gray-300 w-28 h-4"
                  ></a>
                </div>
              </div>

              <form className="mt-10 rounded bg-gray-300 w-full h-80"></form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <p
                      key={index}
                      className="rounded bg-gray-300 w-full h-4"
                    ></p>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <li className="text-gray-400 bg-gray-300 rounded w-full h-4" key={index}>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonProductPage;
