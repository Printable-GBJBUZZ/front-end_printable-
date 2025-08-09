// pricing.ts
import {
  DocumentItem,
  PriceBreakdownItem,
  Order,
} from "@/context/orderContext";

// Normalize function to handle case/spacing issues
function normalize(val: string | undefined | null): string {
  return (val || "").trim().toLowerCase();
}

export function calculatePriceBreakdown(
  documents: DocumentItem[]
): PriceBreakdownItem[] {
  const breakdown: PriceBreakdownItem[] = [];

  // Debug: Log what's actually in the documents
  console.log("Documents being processed:", JSON.stringify(documents, null, 2));

  documents.forEach((doc, index) => {
    console.log(`Processing document ${index}:`, {
      paperSize: doc.paperSize,
      paperType: doc.paperType,
      colorType: doc.colorType,
      bindingType: doc.bindingType,
      laminationType: doc.laminationType,
      coverType: doc.coverType,
      copies: doc.copies,
    });

    // Normalized price maps (all lowercase)
    const paperSizePrices: Record<string, number> = {
      "letter (8.5 x 11 inches)": 5,
      "a4 (8.27 x 11.69 inches)": 6,
      "legal (8.5 x 14 inches)": 7,
      a3: 10,
      tabloid: 12,
      statement: 8,
      a5: 4,
    };

    const paperTypePrices: Record<string, number> = {
      "standard paper": 0,
      "premium paper": 5,
      "photo paper": 10,
      "card stock": 22,
    };

    const colorPrices: Record<string, number> = {
      "black and white": 1,
      color: 3,
    };

    const bindingPrices: Record<string, number> = {
      "no binding": 0,
      "staple binding": 1,
      "spiral binding": 25,
      "comb binding": 10,
      "perfect binding": 10,
    };

    const laminationPrices: Record<string, number> = {
      "no laminations": 0,
      "matte lamination": 15,
      "gloss lamination": 20,
    };

    const coverPrices: Record<string, number> = {
      "no cover": 0,
      "clear front cover": 5,
      "colored back cover": 7,
      "front & back covers": 15,
    };

    // Normalize all document properties
    const sizeKey = normalize(doc.paperSize);
    const typeKey = normalize(doc.paperType);
    const colorKey = normalize(doc.colorType);
    const bindingKey = normalize(doc.bindingType);
    const laminationKey = normalize(doc.laminationType);
    const coverKey = normalize(doc.coverType);

    console.log(`Normalized keys for document ${index}:`, {
      sizeKey,
      typeKey,
      colorKey,
      bindingKey,
      laminationKey,
      coverKey,
    });

    const copies = doc.copies && doc.copies > 0 ? doc.copies : 1;

    // Paper Size
    const paperSizePrice = paperSizePrices[sizeKey];
    if (paperSizePrice !== undefined) {
      breakdown.push({
        label: `Paper Size: ${doc.paperSize}`,
        unitPrice: paperSizePrice,
        quantity: copies,
        total: paperSizePrice * copies,
      });
      console.log(
        `Added Paper Size: ${paperSizePrice} * ${copies} = ${
          paperSizePrice * copies
        }`
      );
    } else {
      console.log(`Paper Size not found for key: "${sizeKey}"`);
    }

    // Paper Type
    const paperTypePrice = paperTypePrices[typeKey];
    if (paperTypePrice !== undefined) {
      breakdown.push({
        label: `Paper Type: ${doc.paperType}`,
        unitPrice: paperTypePrice,
        quantity: copies,
        total: paperTypePrice * copies,
      });
      console.log(
        `Added Paper Type: ${paperTypePrice} * ${copies} = ${
          paperTypePrice * copies
        }`
      );
    } else {
      console.log(`Paper Type not found for key: "${typeKey}"`);
    }

    // Color Type
    const colorPrice = colorPrices[colorKey];
    if (colorPrice !== undefined) {
      breakdown.push({
        label: `Color Type: ${doc.colorType}`,
        unitPrice: colorPrice,
        quantity: copies,
        total: colorPrice * copies,
      });
      console.log(
        `Added Color: ${colorPrice} * ${copies} = ${colorPrice * copies}`
      );
    } else {
      console.log(`Color Type not found for key: "${colorKey}"`);
    }

    // Binding (only if price > 0)
    const bindingPrice = bindingPrices[bindingKey];
    if (bindingPrice !== undefined && bindingPrice > 0) {
      breakdown.push({
        label: `Binding: ${doc.bindingType}`,
        unitPrice: bindingPrice,
        quantity: 1,
        total: bindingPrice,
      });
      console.log(`Added Binding: ${bindingPrice}`);
    } else {
      console.log(
        `Binding not added. Price: ${bindingPrice}, Key: "${bindingKey}"`
      );
    }

    // Lamination (only if price > 0)
    const laminationPrice = laminationPrices[laminationKey];
    if (laminationPrice !== undefined && laminationPrice > 0) {
      breakdown.push({
        label: `Lamination: ${doc.laminationType}`,
        unitPrice: laminationPrice,
        quantity: copies,
        total: laminationPrice * copies,
      });
      console.log(
        `Added Lamination: ${laminationPrice} * ${copies} = ${
          laminationPrice * copies
        }`
      );
    } else {
      console.log(
        `Lamination not added. Price: ${laminationPrice}, Key: "${laminationKey}"`
      );
    }

    // Cover (only if price > 0)
    const coverPrice = coverPrices[coverKey];
    if (coverPrice !== undefined && coverPrice > 0) {
      breakdown.push({
        label: `Cover: ${doc.coverType}`,
        unitPrice: coverPrice,
        quantity: 1,
        total: coverPrice,
      });
      console.log(`Added Cover: ${coverPrice}`);
    } else {
      console.log(`Cover not added. Price: ${coverPrice}, Key: "${coverKey}"`);
    }

    // Confidential Print
    if (doc.confidentialPrint) {
      breakdown.push({
        label: "Confidential Print",
        unitPrice: 10,
        quantity: 1,
        total: 10,
      });
      console.log(`Added Confidential Print: 10`);
    }

    // Rush Order
    if (doc.rushOrder) {
      breakdown.push({
        label: "Rush Order Fee",
        unitPrice: 20,
        quantity: 1,
        total: 20,
      });
      console.log(`Added Rush Order: 20`);
    }
  });

  console.log("Final breakdown:", breakdown);
  return breakdown;
}

export function calculateOrderTotals(order: Order) {
  // CRITICAL FIX: Always recalculate from documents
  const breakdown: PriceBreakdownItem[] = calculatePriceBreakdown(
    order.documents
  );

  // Per-item totals
  const itemTotals = breakdown.map((item) => ({
    label: item.label,
    total: item.total || 0,
  }));

  // Category totals
  const categoryTotals: Record<string, number> = {};
  breakdown.forEach((item) => {
    let category = "";

    if (
      item.label.startsWith("Paper Size") ||
      item.label.startsWith("Paper Type")
    ) {
      category = "Paper";
    } else if (item.label.startsWith("Color Type")) {
      category = "Color";
    } else if (item.label.startsWith("Binding")) {
      category = "Binding";
    } else if (item.label.startsWith("Lamination")) {
      category = "Lamination";
    } else if (item.label.startsWith("Cover")) {
      category = "Cover";
    } else if (item.label === "Confidential Print") {
      category = "Confidential Print";
    } else if (item.label === "Rush Order Fee") {
      category = "Rush Order";
    }

    if (category) {
      categoryTotals[category] =
        (categoryTotals[category] || 0) + (item.total || 0);
    }
  });

  // Subtotal
  const subtotal = breakdown.reduce((acc, item) => acc + (item.total || 0), 0);

  // Delivery charge
  const deliveryCharges = order.fulfillmentType === "delivery" ? 50 : 0;

  // Tax (8%)
  const tax = subtotal * 0.08;

  // Discount
  const discount = subtotal > 500 ? 50 : 0;

  // Final total
  const total = subtotal + deliveryCharges + tax - discount;

  console.log("Category totals:", categoryTotals);

  return {
    breakdown,
    itemTotals,
    categoryTotals,
    subtotal,
    deliveryCharges,
    tax,
    discount,
    total,
  };
}
