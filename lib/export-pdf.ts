export async function exportToPDF(
  sourceElementId: string,
  filename: string = "brand-master-prompt.pdf"
) {
  const html2pdf = (await import("html2pdf.js")).default;

  const source = document.getElementById(sourceElementId);
  if (!source) return;

  // Clone the element so we can style it for print without affecting the UI
  const clone = source.cloneNode(true) as HTMLElement;

  // Apply print-friendly styles
  Object.assign(clone.style, {
    position: "fixed",
    top: "-9999px",
    left: "-9999px",
    width: "170mm",
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "11px",
    lineHeight: "1.7",
    padding: "0",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    zIndex: "-1",
  });

  document.body.appendChild(clone);

  const opt = {
    margin: [16, 20, 16, 20] as [number, number, number, number],
    filename,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
  };

  try {
    await html2pdf().set(opt).from(clone).save();
  } finally {
    document.body.removeChild(clone);
  }
}

export function copyToClipboard(text: string): Promise<void> {
  // Primary: modern async clipboard API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    return navigator.clipboard.writeText(text);
  }

  // Fallback: textarea select + execCommand (works everywhere, including non-HTTPS)
  return new Promise((resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    Object.assign(textarea.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "1px",
      height: "1px",
      opacity: "0",
      pointerEvents: "none",
    });
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (success) {
        resolve();
      } else {
        reject(new Error("execCommand copy failed"));
      }
    } catch (err) {
      document.body.removeChild(textarea);
      reject(err);
    }
  });
}
