// import { useOrder, type DocumentItem } from "@/context/orderContext";
// import { PDFDocument } from "pdf-lib";

// const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}`;

// async function getPdfPageCount(file: File): Promise<number> {
//   try {
//     const buffer = await file.arrayBuffer();
//     const pdf = await PDFDocument.load(buffer);
//     return pdf.getPageCount();
//   } catch (error) {
//     console.warn("Failed to get page count:", error);
//     return 1; // Fallback to 1 page if error occurs
//   }
// }

// export default function UseStorage() {
//   const { order, dispatch } = useOrder();

//   const uploadFile = async (file: File): Promise<DocumentItem | null> => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await fetch(`${API_BASE_URL}/api/file/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log(data.fileUrl);

//       const pageCount =
//         file.type === "application/pdf" ? await getPdfPageCount(file) : 1;

//       const newDoc: DocumentItem = {
//         id: data.fileId,
//         fileName: file.name,
//         fileUrl: data.fileUrl,
//         size: file.size,
//         copies: 1,
//         colorType: "black and white",
//         paperSize: "A4 (8.27 x 11.69 inches)",
//         printType: "front",
//         pageDirection: "vertical",
//         pagesToPrint: "All",
//         pages: pageCount,
//       };

//       dispatch({ type: "ADD_DOCUMENT", payload: newDoc });
//       return newDoc;
//     } catch (err: any) {
//       console.error("Upload error:", err);

//       const errorDoc: DocumentItem = {
//         id: `error-${Date.now()}`,
//         fileName: file.name,
//         fileUrl: "",
//         size: file.size,
//         copies: 1,
//         colorType: "black and white",
//         paperSize: "A4 (8.27 x 11.69 inches)",
//         printType: "front",
//         pageDirection: "vertical",
//         pagesToPrint: "All",
//         error: err.message || String(err),
//         pages: 1,
//       };

//       dispatch({ type: "ADD_DOCUMENT", payload: errorDoc });
//       return null;
//     }
//   };

//   const deleteFile = async (
//     fileId: string,
//     fileName: string,
//     index: number,
//     setStatusMessage: (status: { text: string; isError?: boolean } | null) => void
//   ) => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/file/${encodeURIComponent(fileId)}`,
//         { method: "DELETE" }
//       );

//       if (!response.ok) {
//         throw new Error(`Delete failed: ${response.status} ${response.statusText}`);
//       }

//       await response.json();
//       dispatch({ type: "REMOVE_DOCUMENT", payload: { index } });
//       setStatusMessage({ text: `${fileName} was successfully deleted.` });
// setTimeout(() => setStatusMessage(null), 3000);
//     } catch (err: any) {
//       console.error("Delete error:", err);
//       setStatusMessage({
//         text: `Failed to delete ${fileName}. ${err.message || ""}`.trim(),
//         isError: true,
//       });
//     }
//   };

//   return {
//     uploadFile,
//     deleteFile,
//   };
// }


// this is updated code , if there is any error or problem happening due to this , you can comment it and use the prev code which was commented out!


import { useOrder, type DocumentItem } from "@/context/orderContext";
import { PDFDocument } from "pdf-lib";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}`;

async function getPdfPageCount(file: File): Promise<number> {
  try {
    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);
    return pdf.getPageCount();
  } catch (error) {
    console.warn("Failed to get page count:", error);
    return 1;
  }
}

export default function UseStorage() {
  const { order, dispatch } = useOrder();

  const uploadFile = async (file: File): Promise<DocumentItem | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/api/file/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.fileUrl);

      const pageCount =
        file.type === "application/pdf" ? await getPdfPageCount(file) : 1;

      const newDoc: DocumentItem = {
        id: data.fileId,
        fileName: file.name,
        fileUrl: data.fileUrl,
        size: file.size,
        copies: 1,
        pages: pageCount,
        colorType: "black and white",
        paperSize: "A4 (8.27 x 11.69 inches)",
        paperType: "Standard Paper",
        bindingType: "No Binding",
        laminationType: "No Laminations",
        coverType: "No Cover",
        confidentialPrint: false,
        fileReview: false,
        rushOrder: false,
        printType: "front",
        pageDirection: "vertical",
        pagesToPrint: "All",
      };

      dispatch({ type: "ADD_DOCUMENT", payload: newDoc });
      return newDoc;
    } catch (err: any) {
      console.error("Upload error:", err);

      const errorDoc: DocumentItem = {
        id: `error-${Date.now()}`,
        fileName: file.name,
        fileUrl: "",
        size: file.size,
        copies: 1,
        pages: 1,
        colorType: "black and white",
        paperSize: "A4 (8.27 x 11.69 inches)",
        paperType: "Standard Paper",
        bindingType: "No Binding",
        laminationType: "No Laminations",
        coverType: "No Cover",
        confidentialPrint: false,
        fileReview: false,
        rushOrder: false,
        printType: "front",
        pageDirection: "vertical",
        pagesToPrint: "All",
        error: err.message || String(err),
      };

      dispatch({ type: "ADD_DOCUMENT", payload: errorDoc });
      return null;
    }
  };

  const deleteFile = async (
    fileId: string,
    fileName: string,
    index: number,
    setStatusMessage: (status: { text: string; isError?: boolean } | null) => void
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${encodeURIComponent(fileId)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status} ${response.statusText}`);
      }

      await response.json();
      dispatch({ type: "REMOVE_DOCUMENT", payload: { index } });
      setStatusMessage({ text: `${fileName} was successfully deleted.` });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      console.error("Delete error:", err);
      setStatusMessage({
        text: `Failed to delete ${fileName}. ${err.message || ""}`.trim(),
        isError: true,
      });
    }
  };

  return {
    uploadFile,
    deleteFile,
  };
}
