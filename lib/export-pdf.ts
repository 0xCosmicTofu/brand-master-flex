export async function exportToPDF(
  promptText: string,
  filename: string = "brand-master-prompt.pdf"
) {
  const html2pdf = (await import("html2pdf.js")).default;

  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: "-1",
    opacity: "0",
    pointerEvents: "none",
  });

  const container = document.createElement("div");
  Object.assign(container.style, {
    width: "170mm",
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "11px",
    lineHeight: "1.7",
    padding: "20px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  });
  container.textContent = promptText;

  wrapper.appendChild(container);
  document.body.appendChild(wrapper);

  const opt = {
    margin: [16, 20, 16, 20] as [number, number, number, number],
    filename,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: container.scrollWidth,
      windowHeight: container.scrollHeight,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
  };

  try {
    await html2pdf().set(opt).from(container).save();
  } finally {
    document.body.removeChild(wrapper);
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
