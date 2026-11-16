
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Shirt,
  Layers,
  Armchair,
  Footprints,
  Dumbbell,
  Backpack,
  Wrench,
  Scissors,
  PanelsTopLeft,
  Flower2,
  ArrowRight,
  ArrowLeft,
  Check,
  Search,
  RotateCcw,
} from "lucide-react";

import { sewingApplications } from "@/data/sewingCustomization";
import { products } from "@/data/products";

const applicationIcons = [
  Shirt,
  Layers,
  Armchair,
  Footprints,
  Dumbbell,
  Backpack,
  Wrench,
  Scissors,
  PanelsTopLeft,
  Flower2,
];

export default function WhatDoYouSew() {
  const [step, setStep] = useState(1);

  const [selectedApplication, setSelectedApplication] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");

  const [customProductType, setCustomProductType] = useState("");
  const [customOperation, setCustomOperation] = useState("");

  const application = sewingApplications.find(
    (item) => item.id === selectedApplication
  );

  const productType = application?.productTypes.find(
    (item) => item.id === selectedProductType
  );

  const operation = productType?.operations.find(
    (item) => item.id === selectedOperation
  );

  const recommendedProducts = useMemo(() => {
    if (!operation) return [];

    return products.filter((product) =>
      operation.recommendedProductIds.includes(product.id)
    );
  }, [operation]);

  const handleApplicationSelect = (id: string) => {
    setSelectedApplication(id);
    setSelectedProductType("");
    setSelectedOperation("");
    setCustomProductType("");
    setCustomOperation("");
  };

  const handleProductTypeSelect = (id: string) => {
    setSelectedProductType(id);
    setSelectedOperation("");
    setCustomOperation("");
  };

  const resetCustomization = () => {
    setStep(1);
    setSelectedApplication("");
    setSelectedProductType("");
    setSelectedOperation("");
    setCustomProductType("");
    setCustomOperation("");
  };

  const canContinue =
    step === 1
      ? Boolean(selectedApplication)
      : step === 2
        ? Boolean(selectedProductType || customProductType.trim())
        : Boolean(selectedOperation || customOperation.trim());

  const selectedApplicationName =
    application?.title || "";

  const selectedProductTypeName =
    productType?.title || customProductType.trim();

  const selectedOperationName =
    operation?.title || customOperation.trim();

  const productImage = (product: (typeof products)[number]) =>
    product.images?.[0] || "";

  return (
    <section className="what-sew-section">
      <div className="what-sew-container">
        <div className="what-sew-heading">
          <span className="what-sew-eyebrow">
            MACHINE FINDER
          </span>

          <h2>What do you sew?</h2>

          <p>
            Tell us what you make and what sewing operation
            you need to perform. We&apos;ll help you find
            suitable machines from our collection.
          </p>
        </div>

        <div className="what-sew-card">
          <div className="what-sew-progress">
            {[1, 2, 3].map((number) => (
              <div
                key={number}
                className={`what-sew-progress-step ${
                  step === number
                    ? "active"
                    : step > number
                      ? "completed"
                      : ""
                }`}
              >
                <span className="what-sew-progress-number">
                  {step > number ? <Check size={15} /> : number}
                </span>

                <span className="what-sew-progress-label">
                  {number === 1
                    ? "Application"
                    : number === 2
                      ? "Product type"
                      : "Operation"}
                </span>
              </div>
            ))}
          </div>

          <div className="what-sew-step-content">
            {step === 1 && (
              <>
                <div className="what-sew-step-heading">
                  <span>STEP 01</span>
                  <h3>What type of products do you make?</h3>
                  <p>
                    Select the application that best describes
                    your sewing work.
                  </p>
                </div>

                <div className="what-sew-options">
                  {sewingApplications.map((item, index) => {
                    const Icon =
                      applicationIcons[index] || Shirt;

                    const isSelected =
                      selectedApplication === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`what-sew-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleApplicationSelect(item.id)
                        }
                      >
                        <span className="what-sew-option-icon">
                          <Icon size={23} strokeWidth={1.7} />
                        </span>

                        <span className="what-sew-option-title">
                          {item.title}
                        </span>

                        {isSelected && (
                          <span className="what-sew-check">
                            <Check size={15} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="what-sew-step-heading">
                  <span>STEP 02</span>
                  <h3>What are you sewing?</h3>
                  <p>
                    Choose the product or garment type you
                    work with.
                  </p>
                </div>

                <div className="what-sew-options">
                  {application?.productTypes.map((item) => {
                    const isSelected =
                      selectedProductType === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`what-sew-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleProductTypeSelect(item.id)
                        }
                      >
                        <span className="what-sew-option-title">
                          {item.title}
                        </span>

                        {isSelected && (
                          <span className="what-sew-check">
                            <Check size={15} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="what-sew-custom-field">
                  <label htmlFor="custom-product-type">
                    Or enter your own product type
                  </label>

                  <input
                    id="custom-product-type"
                    type="text"
                    placeholder="e.g. School uniforms"
                    value={customProductType}
                    onChange={(event) => {
                      setCustomProductType(event.target.value);
                      setSelectedProductType("");
                      setSelectedOperation("");
                    }}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="what-sew-step-heading">
                  <span>STEP 03</span>
                  <h3>Which sewing operation do you need?</h3>
                  <p>
                    Select the operation you want to perform
                    on your {selectedProductTypeName.toLowerCase()}.
                  </p>
                </div>

                {productType && (
                  <div className="what-sew-options">
                    {productType.operations.map((item) => {
                      const isSelected =
                        selectedOperation === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`what-sew-option ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => {
                            setSelectedOperation(item.id);
                            setCustomOperation("");
                          }}
                        >
                          <span className="what-sew-option-title">
                            {item.title}
                          </span>

                          {isSelected && (
                            <span className="what-sew-check">
                              <Check size={15} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="what-sew-custom-field">
                  <label htmlFor="custom-operation">
                    Or enter a different sewing operation
                  </label>

                  <input
                    id="custom-operation"
                    type="text"
                    placeholder="e.g. Decorative stitching"
                    value={customOperation}
                    onChange={(event) => {
                      setCustomOperation(event.target.value);
                      setSelectedOperation("");
                    }}
                  />
                </div>

                {canContinue && (
                  <div className="what-sew-results">
                    <div className="what-sew-results-heading">
                      <div>
                        <span>MACHINE RECOMMENDATIONS</span>
                        <h3>Machines for your operation</h3>
                      </div>
                    </div>

                    {recommendedProducts.length > 0 ? (
                      <div className="what-sew-product-list">
                        {recommendedProducts.map((product) => (
                          <div
                            className="what-sew-product"
                            key={product.id}
                          >
                            {productImage(product) ? (
                              <img
                                src={productImage(product)}
                                alt={product.name}
                              />
                            ) : (
                              <div className="what-sew-product-placeholder">
                                <Search size={25} />
                              </div>
                            )}

                            <div className="what-sew-product-info">
                              <span>{product.brand}</span>
                              <h4>{product.name}</h4>
                              <strong>
                                LKR {product.price.toLocaleString("en-LK")}
                              </strong>

                              <div className="what-sew-product-meta">
                                <span>
                                  {product.condition === "used"
                                    ? "Used"
                                    : "Brand New"}
                                </span>

                                <span
                                  className={
                                    product.stockStatus === "in_stock"
                                      ? "in-stock"
                                      : "not-in-stock"
                                  }
                                >
                                  {product.stockStatus === "in_stock"
                                    ? "In Stock"
                                    : product.stockStatus === "pre_order"
                                      ? "Pre-order"
                                      : "Out of Stock"}
                                </span>
                              </div>
                            </div>

                            <Link
                              href={`/products/${product.slug}`}
                              className="what-sew-view-link"
                            >
                              View Machine
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="what-sew-no-results">
                        <h4>No exact machine match found</h4>
                        <p>
                          We couldn&apos;t find a confirmed matching
                          machine in our current collection. Contact
                          our team and we can help identify a suitable
                          solution.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="what-sew-footer">
            <div className="what-sew-selection-summary">
              {selectedApplicationName && (
                <span>{selectedApplicationName}</span>
              )}

              {selectedProductTypeName && (
                <span>{selectedProductTypeName}</span>
              )}

              {selectedOperationName && (
                <span>{selectedOperationName}</span>
              )}
            </div>

            <div className="what-sew-actions">
              {step > 1 && (
                <button
                  type="button"
                  className="what-sew-back-button"
                  onClick={() => setStep((current) => current - 1)}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  className="what-sew-continue-button"
                  disabled={!canContinue}
                  onClick={() => setStep((current) => current + 1)}
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  className="what-sew-reset-button"
                  onClick={resetCustomization}
                >
                  <RotateCcw size={15} />
                  Start Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
