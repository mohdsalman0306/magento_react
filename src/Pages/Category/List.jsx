import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_PRODUCTS } from "../../utils/graphql/query";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductBox from "../../components/Category/ProductBox";
import SkeletonProductBox from "../../components/Category/SkeletonProductBox";

const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const List = () => {
  const location = useLocation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [defaultSort, setDefaultSort] = useState("");
  const [sortingLoading, setSortingLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  
  const categoryUid = location?.state?.uid;
  
  // Build filter object combining category and attribute filters
  const buildFilterObject = (attributeFilters = {}) => {
    const filter = {
      category_uid: { eq: categoryUid },
    };
    
    // Add each attribute filter dynamically
    Object.keys(attributeFilters).forEach((attributeCode) => {
      filter[attributeCode] = attributeFilters[attributeCode];
    });
    
    console.log("Built filter object:", filter);
    return filter;
  };
  
  // Build initial query variables
  const buildQueryVariables = () => {
    return {
      filters: buildFilterObject(selectedFilters),
      sort: {
        [defaultSort || "position"]: "ASC",
      },
      pageSize: 20,
      currentPage: 1,
    };
  };
  
  const { loading, err, data, refetch } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: buildQueryVariables(),
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const { items, aggregations, sort_fields, page_info, suggestions } =
    data?.products || {};

  useEffect(() => {
    if (sort_fields?.default) {
      setDefaultSort(sort_fields.default);
    }
  }, [sort_fields]);

  // Handle filter checkbox changes
  const handleFilterChange = async (attributeCode, value, isChecked) => {
    setIsFilterLoading(true);
    
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      
      if (isChecked) {
        // Add filter
        if (!newFilters[attributeCode]) {
          newFilters[attributeCode] = { in: [value] };
        } else {
          // Make sure we don't mutate the original array
          newFilters[attributeCode] = {
            in: [...newFilters[attributeCode].in, value]
          };
        }
      } else {
        // Remove filter
        if (newFilters[attributeCode]) {
          const updatedValues = newFilters[attributeCode].in.filter(
            (v) => v !== value
          );
          
          // Remove attribute if no values left
          if (updatedValues.length === 0) {
            delete newFilters[attributeCode];
          } else {
            newFilters[attributeCode] = { in: updatedValues };
          }
        }
      }
      
      console.log("Updated filters:", newFilters);
      return newFilters;
    });
  };

  // Refetch when filters change with debounce
  useEffect(() => {
    if (!categoryUid) return;
    
    const timer = setTimeout(async () => {
      try {
        const filterObject = buildFilterObject(selectedFilters);
        console.log("Refetching with selected filters:", selectedFilters);
        console.log("Final filter object sent to API:", filterObject);
        
        await refetch({
          category_uid: categoryUid,
          sort: {
            [defaultSort || "position"]: "ASC",
          },
          filters: filterObject,
          pageSize: 20,
          currentPage: 1,
        });
      } catch (error) {
        console.error("Error applying filters:", error);
        console.error("Error details:", error.graphQLErrors);
      } finally {
        setIsFilterLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [selectedFilters, categoryUid, defaultSort]);

  const handleSorting = async (e, value) => {
    e.preventDefault();
    const lastSort = localStorage.getItem("lastSort");
    setDefaultSort(value);
    
    if (lastSort != value) {
      setSortingLoading(true);
      localStorage.setItem("lastSort", value);
      
      try {
        await refetch({
          category_uid: categoryUid,
          sort: {
            [value]: "ASC",
          },
          filters: buildFilterObject(selectedFilters),
          pageSize: 20,
          currentPage: 1,
        });
      } catch (error) {
        console.error("Error fetching sorted products:", error);
      } finally {
        setSortingLoading(false);
      }
    }
  };

  // Check if a filter is currently selected
  const isFilterSelected = (attributeCode, value) => {
    return selectedFilters[attributeCode]?.in?.includes(value) || false;
  };

  const products = items;
  
  if (err) return <p>Error: {err.message}</p>;
  
  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Mobile Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {aggregations?.map((aggregation, index) => (
                    <Disclosure
                      key={index}
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {aggregation.label}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-[&:not([data-open])]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {aggregation?.options?.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    value={option.value}
                                    checked={isFilterSelected(
                                      aggregation.attribute_code,
                                      option.value
                                    )}
                                    onChange={(e) =>
                                      handleFilterChange(
                                        aggregation.attribute_code,
                                        option.value,
                                        e.target.checked
                                      )
                                    }
                                    id={`filter-mobile-${aggregation.attribute_code}-${optionIdx}`}
                                    name={`${aggregation.attribute_code}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-mobile-${aggregation.attribute_code}-${optionIdx}`}
                                className="min-w-0 flex-1 text-gray-500"
                              >
                                {option.label === "1"
                                  ? "Yes"
                                  : option.label === "0"
                                  ? "No"
                                  : option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sort_fields?.options?.map((option) => (
                        <MenuItem key={option.value}>
                          <a
                            href={"#"}
                            value={option.value}
                            onClick={(e) => handleSorting(e, option.value)}
                            className={classNames(
                              option.value === defaultSort
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            )}
                          >
                            {option.label}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Desktop Filters */}
                <div className="hidden lg:block">
                  {aggregations?.map((aggregation, index) => (
                    <div key={index} className="border-b border-gray-200 py-6">
                      <h3 className="text-sm font-medium text-gray-900">
                        {aggregation.label}
                      </h3>
                      <div className="mt-4 space-y-4">
                        {aggregation?.options?.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  value={option.value}
                                  checked={isFilterSelected(
                                    aggregation.attribute_code,
                                    option.value
                                  )}
                                  onChange={(e) =>
                                    handleFilterChange(
                                      aggregation.attribute_code,
                                      option.value,
                                      e.target.checked
                                    )
                                  }
                                  id={`filter-${aggregation.attribute_code}-${optionIdx}`}
                                  name={`${aggregation.attribute_code}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${aggregation.attribute_code}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label === "1"
                                ? "Yes"
                                : option.label === "0"
                                ? "No"
                                : option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Show filter loading indicator */}
                  {isFilterLoading && (
                    <div className="mb-4 p-2 bg-blue-50 text-blue-700 text-sm rounded">
                      Applying filters...
                    </div>
                  )}
                  
                  <div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {loading || isFilterLoading
                        ? Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonProductBox key={index} />
                          ))
                        : products?.map((product) => (
                            <ProductBox
                              key={product.uid}
                              product={product}
                              loading={loading}
                            />
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      {sortingLoading && (
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

export default List;