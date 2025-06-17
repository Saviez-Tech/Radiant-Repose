"use client";

import { fetchProductAction } from "@/actions/product.server";
import ProductCard2 from "@/components/dashboard/ProductCard2";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addScannedItem,
  removeSearchValue,
} from "@/lib/redux/slices/luxuryPosFlowSlice";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export default function ItemBarCodeManualLookupPage() {
  const { searchValue, scannedItems } = useAppSelector(
    (store) => store.luxuryPosFlow
  );
  const [items, setItems] = useState<ScannedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<SelectedProduct[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFetchProductByBarcode = async () => {
    setIsLoading(true);
    setItems([]);
    const { products, errorMessage, status } = await fetchProductAction(
      searchValue!,
      "luxury"
    );

    if (products) {
      setItems(products);
    } else if (errorMessage) {
      setItems([]);
      if (status !== 404) {
        toast.error(errorMessage);
      }
    }

    setIsLoading(false);
  };

  const handleItemRemove = useCallback(
    (barcode: string) => {
      if (items.length === 1) {
        dispatch(removeSearchValue());
        router.push("/pos/luxury");
        return;
      }

      setItems((prev) => prev.filter((v) => v.barcode !== barcode));
    },
    [items.length, dispatch, router]
  );

  const handleAddSelectedItems = () => {
    if (selectedItems.length) {
      selectedItems.forEach((item) => dispatch(addScannedItem(item)));
    }
  };

  // Search value effect
  useEffect(() => {
    setIsLoading(true);
    if (!searchValue) {
      router.push("/pos/luxury");
    }
    const debounce = setTimeout(() => {
      if (
        searchValue?.trim() !== "" &&
        searchValue &&
        searchValue?.trim().length > 3
      ) {
        handleFetchProductByBarcode();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchValue]);

  useEffect(() => {
    if (!scannedItems.length || !selectedItems.length) return;

    // Create a new array with items that are NOT in scannedItems
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) =>
        !scannedItems.some(
          (scannedItem) => scannedItem.barcode === selectedItem.barcode
        )
    );

    // Only update state if there's actually a change
    if (updatedSelectedItems.length !== selectedItems.length) {
      setSelectedItems(updatedSelectedItems);
    }
  }, [scannedItems.length, selectedItems.length]);

  useEffect(() => {
    if (!items.length) return;

    let timer: NodeJS.Timeout;

    setItems((prev) => {
      const updatedItems = prev.filter(
        (item) =>
          !scannedItems.some((scanned) => scanned.barcode === item.barcode)
      );

      // After removing, check if updatedItems is empty
      if (updatedItems.length === 0) {
        setItems(updatedItems);

        // Use a separate effect for navigation
        if (updatedItems.length === 0) {
          timer = setTimeout(() => {
            dispatch(removeSearchValue());
            router.push("/pos/luxury");
          }, 0);

          return updatedItems;
        }
      }

      return updatedItems;
    });

    return () => clearTimeout(timer);
  }, [scannedItems.length, items.length]);

  if (isLoading) {
    return (
      <div className="py-16">
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <main>
      {items.length ? (
        <section className="mt-14">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-primary-deepBlack">Item Found</h2>
            <hr className="flex-1 h-[1px] w-full bg-primary-base_color2/20" />
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
            {items.map((v) => (
              <ProductCard2
                product={v}
                key={v.barcode}
                handleItemRemove={handleItemRemove}
                setIsSelected={setSelectedItems}
                isSelected={selectedItems.some(
                  (item) => item.barcode === v.barcode
                )}
              />
            ))}
          </div>

          <Button
            onClick={handleAddSelectedItems}
            disabled={!selectedItems.length}
            className={clsx(
              "flex items-center gap-2 px-4 my-6 py-3 h-12 rounded-md font-medium transition-colors",
              selectedItems.length
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            Add Selected Item
            <ArrowRight size={16} />
          </Button>
        </section>
      ) : (
        <div className="flex h-full justify-center items-center flex-col my-2">
          <div className="bg-[url('/images/barcode-no-found-item.svg')] w-[25em] h-[25em] bg-contain bg-center bg-no-repeat"></div>
          <p
            role="alert"
            className="text-primary-charcoal text-sm font-medium text-center"
          >
            Item not found! <br /> Check the Barcode Number and try again.
          </p>
        </div>
      )}
    </main>
  );
}
