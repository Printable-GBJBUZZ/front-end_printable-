// pricing.ts
import {
  DocumentItem,
  PriceBreakdownItem,
  Order,
} from "@/context/orderContext";

export function calculatePriceBreakdown(
  documents: DocumentItem[]
): PriceBreakdownItem[] {
  const breakdown: PriceBreakdownItem[] = [];

  documents.forEach((doc) => {
    const paperSizePrices: Record<DocumentItem["paperSize"], number> = {
      "Letter (8.5 x 11 inches)": 5,
      "A4 (8.27 x 11.69 inches)": 6,
      "Legal (8.5 x 14 inches)": 7,
      A3: 10,
      Tabloid: 12,
      Statement: 8,
      A5: 4,
    };

    const colorPrices: Record<DocumentItem["colorType"], number> = {
      "Black and White": 1,
      Color: 3,
    };

    const bindingPrices: Record<DocumentItem["bindingType"], number> = {
      "No Binding": 0,
      "Staple Binding": 5,
      "Spiral Binding": 10,
      "Comb Binding": 8,
      "Perfect Binding": 12,
    };

    const laminationPrices: Record<DocumentItem["laminationType"], number> = {
      "No Laminations": 0,
      "Matte Lamination": 7,
      "Gloss Lamination": 8,
    };

    const coverPrices: Record<DocumentItem["coverType"], number> = {
      "No Cover": 0,
      "Clear Front Cover": 5,
      "Colored Back Cover": 5,
      "Front & Back Covers": 8,
    };

    // Paper size
    breakdown.push({
      label: `Paper Size: ${doc.paperSize}`,
      unitPrice: paperSizePrices[doc.paperSize],
      quantity: doc.copies,
      total: paperSizePrices[doc.paperSize] * doc.copies,
    });

    // Color type
    breakdown.push({
      label: `Color Type: ${doc.colorType}`,
      unitPrice: colorPrices[doc.colorType],
      quantity: doc.copies,
      total: colorPrices[doc.colorType] * doc.copies,
    });

    // Binding
    if (bindingPrices[doc.bindingType] > 0) {
      breakdown.push({
        label: `Binding: ${doc.bindingType}`,
        unitPrice: bindingPrices[doc.bindingType],
        quantity: 1,
        total: bindingPrices[doc.bindingType],
      });
    }

    // Lamination
    if (laminationPrices[doc.laminationType] > 0) {
      breakdown.push({
        label: `Lamination: ${doc.laminationType}`,
        unitPrice: laminationPrices[doc.laminationType],
        quantity: doc.copies,
        total: laminationPrices[doc.laminationType] * doc.copies,
      });
    }

    // Cover
    if (coverPrices[doc.coverType] > 0) {
      breakdown.push({
        label: `Cover: ${doc.coverType}`,
        unitPrice: coverPrices[doc.coverType],
        quantity: 1,
        total: coverPrices[doc.coverType],
      });
    }

    // Confidential print
    if (doc.confidentialPrint) {
      breakdown.push({
        label: "Confidential Print",
        unitPrice: 10,
        quantity: 1,
        total: 10,
      });
    }

    // Rush order
    if (doc.rushOrder) {
      breakdown.push({
        label: "Rush Order Fee",
        unitPrice: 20,
        quantity: 1,
        total: 20,
      });
    }
  });

  return breakdown;
}

export function calculateOrderTotals(order: Order) {
  // If breakdown is empty, generate it from documents
  const breakdown: PriceBreakdownItem[] = order.breakdown?.length
    ? order.breakdown
    : calculatePriceBreakdown(order.documents);

  // Per-item totals (basically the same as `total` field, but isolated)
  const itemTotals = breakdown.map((item) => ({
    label: item.label,
    total: item.total || 0,
  }));

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

  return {
    breakdown,
    itemTotals, 
    subtotal,
    deliveryCharges,
    tax,
    discount,
    total,
  };
}
