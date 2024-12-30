import { UseFormReturn } from "react-hook-form";
import { Product } from "@/lib/types/product";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Attribute } from "@prisma/client";

interface AttributeFieldsProps {
  form: UseFormReturn<Product>;
  allAttributes: { id: string; name: string; switchers?: { id: string; name: string }[] }[];
}

export function AttributeFields({ form, allAttributes }: AttributeFieldsProps) {
  const attributes = form.watch("attributes") ?? [];
  const variations = form.watch("variations") ?? [];

  const addAttribute = (attributeId: string) => {
    const currentAttributes = form.getValues("attributes") ?? []; // Default to an empty array
    const selectedAttribute = allAttributes.find((attr) => attr.id === attributeId);
  
    if (selectedAttribute && !currentAttributes.some((attr) => attr.id === attributeId)) {
      form.setValue("attributes", [...currentAttributes, { ...selectedAttribute }]);
    }
  };
  
  const removeAttribute = (attributeId: string) => {
    const currentAttributes = form.getValues("attributes") ?? []; // Default to an empty array
    const updatedAttributes = currentAttributes.filter((attr) => attr.id !== attributeId);
    form.setValue("attributes", updatedAttributes);
  
    // Remove associated variations
    const currentVariations = form.getValues("variations") ?? []; // Default to an empty array
    const updatedVariations = currentVariations.filter(
      (variation) => variation.attributeId !== attributeId
    );
    form.setValue("variations", updatedVariations);
  };
  

  const addVariation = (attributeId: string, switcherIds: string[]) => {
    const currentVariations = form.getValues("variations") ?? [];
    const newVariations = switcherIds.map((switcherId) => ({
      attributeId,
      switcherId,
      featuredImage: {url:""},
      manageStock: false,
      price: 0,
      regularPrice: 0,
      soldPrice: 0,
      initialQuantity: 0,
      availableQuantity: 0,
      soldQuantity: 0,
    }));
  
    // Merge existing variations with new ones, avoiding duplicates
    const updatedVariations = [
      ...currentVariations.filter((v) => v.attributeId !== attributeId),
      ...newVariations,
    ];
  
    form.setValue("variations", updatedVariations);
  };
  
  const updateVariationField = (index: number, field: string, value: any) => {
    const updatedVariations = [...variations];

    const fieldParts = field.split(".");

    if (fieldParts.length > 1) {

      updatedVariations[index][fieldParts[0]] = {

        ...updatedVariations[index][fieldParts[0]],

        [fieldParts[1]]: value,

      };

    } else {

      updatedVariations[index][field] = value;

    }

    //updatedVariations[index][field] = value;
    form.setValue("variations", updatedVariations);
  };
  

  const updateFeatureImage = (variationIndex: number, featuredImage: string) => {
    const updatedVariations = [...variations];
    updatedVariations[variationIndex].featuredImage = featuredImage;
    form.setValue("variations", updatedVariations);
  };

  const removeVariation = (variationIndex: number) => {
    const updatedVariations = variations.filter((_, index) => index !== variationIndex);
    form.setValue("variations", updatedVariations);
  };

  console.log("Current attributes:", form.getValues("attributes"));
  console.log("Current Variations:", form.getValues("variations"));


  return (
    <div>
      <h3 className="font-semibold mb-4">Product Attributes</h3>
      <div className="space-y-4">
        {attributes.length > 0 && attributes.map((attribute) => (
          <div key={attribute.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{attribute.name}</h4>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeAttribute(attribute.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {attribute.switchers?.length > 0 && (
              <Select
              isMulti
              options={attribute.switchers.map((switcher) => ({
                value: switcher.id,
                label: switcher.name,
              }))}
              value={variations
                .filter((variation) => variation.attributeId === attribute.id)
                .map((variation) => ({
                  value: variation.switcherId,
                  label: attribute.switchers.find((s) => s.id === variation.switcherId)?.name,
                }))}
              onChange={(selected) => {
                const selectedIds = selected.map((option) => option.value);
                addVariation(attribute.id, selectedIds);
              }}
              placeholder="Select variations"
            />
            
            )}
          </div>
        ))}
        {allAttributes.length > 0 && <Select
          options={allAttributes
            .filter((attr) => !attributes.some((a) => a.id === attr.id))
            .map((attr) => ({
              value: attr.id,
              label: attr.name,
            }))}
          onChange={(selected) => addAttribute(selected?.value || "")}
          placeholder="Select an attribute"
        />}
      </div>

      <h3 className="font-semibold mt-8 mb-4">Selected Variations</h3>
      <div className="space-y-4">
      {variations.length > 0 &&
  variations.map((variation, index) => (
    <div key={`${variation.attributeId}-${variation.switcherId}`} className="p-4 border rounded-md">
      <div className="flex justify-between items-center">
        <span>
          {allAttributes.find((attr) => attr.id === variation.attributeId)?.name} -{" "}
          {allAttributes
            .find((attr) => attr.id === variation.attributeId)
            ?.switchers?.find((switcher) => switcher.id === variation.switcherId)?.name}
        </span>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => removeVariation(index)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-4">
        <label htmlFor={`featured-image-${index}`} className="block text-sm font-medium text-gray-700">
          Feature Image URL
        </label>
        <Input
          id={`featured-image-${index}`}
          placeholder="Feature Image URL"
          value={variation.featuredImage.url}
          onChange={(e) => updateVariationField(index, "featuredImage.url", e.target.value)}
        />
        {form.formState.errors.variations?.[index]?.featuredImage?.url && (
          <p className="text-red-500 text-sm mt-1">
        {form.formState.errors.variations[index].featuredImage.url.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700">
        Price
          </label>
          <Input
        id={`price-${index}`}
        placeholder="Price"
        type="number"
        value={variation.price}
        onChange={(e) => updateVariationField(index, "price", Number(e.target.value))}
          />
          {form.formState.errors.variations?.[index]?.price && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.variations[index].price.message}
        </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor={`regular-price-${index}`} className="block text-sm font-medium text-gray-700">
        Regular Price
          </label>
          <Input
        id={`regular-price-${index}`}
        placeholder="Regular Price"
        type="number"
        value={variation.regularPrice}
        onChange={(e) => updateVariationField(index, "regularPrice", Number(e.target.value))}
          />
          {form.formState.errors.variations?.[index]?.regularPrice && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.variations[index].regularPrice.message}
        </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor={`sold-price-${index}`} className="block text-sm font-medium text-gray-700">
        Sold Price
          </label>
          <Input
        id={`sold-price-${index}`}
        placeholder="Sold Price"
        type="number"
        value={variation.soldPrice}
        onChange={(e) => updateVariationField(index, "soldPrice", Number(e.target.value))}
          />
          {form.formState.errors.variations?.[index]?.soldPrice && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.variations[index].soldPrice.message}
        </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor={`initial-quantity-${index}`} className="block text-sm font-medium text-gray-700">
        Initial Quantity
          </label>
          <Input
        id={`initial-quantity-${index}`}
        placeholder="Initial Quantity"
        type="number"
        value={variation.initialQuantity}
        onChange={(e) => updateVariationField(index, "initialQuantity", Number(e.target.value))}
          />
          {form.formState.errors.variations?.[index]?.initialQuantity && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.variations[index].initialQuantity.message}
        </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor={`available-quantity-${index}`} className="block text-sm font-medium text-gray-700">
        Available Quantity
          </label>
          <Input
        id={`available-quantity-${index}`}
        placeholder="Available Quantity"
        type="number"
        value={variation.availableQuantity}
        onChange={(e) => updateVariationField(index, "availableQuantity", Number(e.target.value))}
          />
          {form.formState.errors.variations?.[index]?.availableQuantity && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.variations[index].availableQuantity.message}
        </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor={`sold-quantity-${index}`} className="block text-sm font-medium text-gray-700">
        Sold Quantity
          </label>
          <Input
        id={`sold-quantity-${index}`}
        placeholder="Sold Quantity"
        type="number"
        value={variation.soldQuantity}
        onChange={(e) => updateVariationField(index, "soldQuantity", Number(e.target.value))}
          />
          {form.formState.errors.variations?.[index]?.soldQuantity && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.variations[index].soldQuantity.message}
        </p>
          )}
        </div>
      
        <div className="flex items-center space-x-2">
          <label htmlFor={`manage-stock-${index}`}>Manage Stock</label>
          <input
            id={`manage-stock-${index}`}
            type="checkbox"
            checked={variation.manageStock}
            onChange={(e) => updateVariationField(index, "manageStock", e.target.checked)}
          />
        </div>
      </div>
    </div>
  ))}

      </div>
    </div>
  );
}
