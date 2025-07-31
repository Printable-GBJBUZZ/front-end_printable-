import { DocumentItem } from "@/context/orderContext";

export function getTotalDocument(documents: DocumentItem[]) {
  return documents.reduce((total, doc) => total + (doc.copies || 1), 0);
}