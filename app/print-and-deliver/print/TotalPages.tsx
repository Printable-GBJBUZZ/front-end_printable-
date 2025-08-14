export default function getTotalPages(order: {
  documents: { copies?: number; pages?: number }[];
}): number {
  return order.documents.reduce((total, doc) => {
    const copies = doc.copies || 1;
    const pages = doc.pages || 1;
    return total + copies * pages;
  }, 0);
}
