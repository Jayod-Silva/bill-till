import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

/**
 * Generates and optionally sends the invoice PDF.
 */
export const generateInvoice = (details, action = "download") => {
    const doc = new jsPDF();
    // Use existing invoice ID from details or generate a new one
    const invoiceId =
      details.invoiceId || `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmationCode =
      details.confirmationCode || "N/A";

    // ── COLORS & STYLING ──
    const primaryColor = [7, 60, 148]; // #073C94
    const secondaryColor = [30, 41, 59]; // Slate-800
    const accentColor = [16, 185, 129]; // Emerald-500
    const grayText = [100, 116, 139]; // Slate-500

    // ── HEADER SECTION ──
    // Bill-Till Logo
    try {
      doc.addImage("/colored-logo.png", "PNG", 14, 15, 40, 20);
    } catch (error) {
      // Fallback to text if image fails to load
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text("Bill-Till", 14, 25);
    }

    // Invoice Meta (Top Right)
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text("INVOICE", 140, 25);

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`Invoice ID:`, 140, 35);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceId, 170, 35);

    doc.setFont("helvetica", "bold");
    doc.text(`Date:`, 140, 40);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString(), 170, 40);

    doc.setFont("helvetica", "bold");
    doc.text(`Status:`, 140, 45);
    doc.setTextColor(...accentColor);
    doc.text("PAID", 170, 45);
    doc.setTextColor(...secondaryColor);

    // ── SENDER & BENEFICIARY ──
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 55, 196, 55);

    // From (Sender) - User
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("FROM (SENDER)", 14, 65);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text(details.businessName || "Valued Customer", 14, 72);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Name: ${details.ownerName}`, 14, 77);
    doc.text(`Address: ${details.address || "N/A"}`, 14, 82, { maxWidth: 80 });
    doc.text(`Phone: ${details.phone}`, 14, 87);
    doc.text(`Email: ${details.email}`, 14, 92);

    // To (Beneficiary) - Bill-Till
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("BILL TO (BENEFICIARY)", 110, 65);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text("Bill-Till", 110, 72);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Bill-Till,", 110, 77);
    doc.text("680A Colombo Road,Kattuwa,Negombo, Sri Lanka ", 110, 82, {
      maxWidth: 80,
    });
    doc.text("Email: support@billtill.co", 110, 87);
    doc.text("Web: www.billtill.co", 110, 92);
    doc.text("Phone: 0114 758900", 110, 97);

    // ── TRANSACTION DETAILS ──
    doc.setDrawColor(241, 245, 249);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 105, 182, 25, 3, 3, "FD");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...grayText);
    doc.text("Payment ID", 25, 115);
    doc.text("Confirmation Code", 85, 115);
    doc.text("Payment Method", 145, 115);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text(details.orderId || "N/A", 25, 122);
    doc.text(confirmationCode, 85, 122);
    doc.text("Card Payment", 145, 122);

    // ── ITEMS TABLE ──
    const cur = details.currency || "LKR";
    const amountVal = parseFloat(details.amount) || 0;
    const tableData = [
      [
        "01",
        "Software Subscription",
        `${details.selectedPlan || "Dynamic"} Plan`,
        "1",
        `${cur} ${amountVal.toLocaleString()}`,
        `${cur} ${amountVal.toLocaleString()}`,
      ],
    ];

    autoTable(doc, {
      startY: 140,
      head: [["#", "Service", "Description", "Qty", "Unit Price", "Total"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: primaryColor,
        fontSize: 9,
        fontStyle: "bold",
        halign: "center",
      },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { halign: "center", cellWidth: 13 },
        3: { halign: "center", cellWidth: 15 },
        4: { halign: "right", cellWidth: 35 },
        5: { halign: "right", cellWidth: 35 },
      },
    });

    const finalY = doc.lastAutoTable.finalY + 15;

    // ── TOTALS ──
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text("Subtotal:", 140, finalY);
    doc.text(
      `${cur} ${parseFloat(details.amount).toLocaleString()}`,
      175,
      finalY,
      {
        align: "right",
      },
    );

    doc.text("Tax (0%):", 140, finalY + 7);
    doc.text(`${cur} 0.00`, 175, finalY + 7, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    doc.line(135, finalY + 10, 196, finalY + 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Total Paid:", 140, finalY + 18);
    doc.text(
      `${cur} ${parseFloat(details.amount).toLocaleString()}`,
      185,
      finalY + 18,
      { align: "right" },
    );

    // ── FOOTER ──
    const pageHeight = doc.internal.pageSize.height;

    doc.setDrawColor(226, 232, 240);
    doc.line(14, pageHeight - 40, 196, pageHeight - 40);

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text("Thank you for your business!", 14, pageHeight - 33);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text(
      "This is a computer-generated document and does not require a physical signature.",
      14,
      pageHeight - 28,
    );
    doc.text(
      "For any queries, please contact support@billtill.co or call +94 0114 758900",
      14,
      pageHeight - 23,
    );

    // ── ACTION ──
    if (action === "view") {
      window.open(doc.output("bloburl"), "_blank");
    } else if (action === "download") {
      doc.save(`BillTill_Invoice_${details.orderId}.pdf`);
    }

    // ── SEND EMAIL IN BACKGROUND ──
    // Only send email on the first action (not on every button click)
    // Use a flag on details to avoid sending twice
    if (!details._emailSent) {
      details._emailSent = true;
      const pdfBlob = doc.output("blob");
      const filename = `BillTill_Invoice_${details.orderId}.pdf`;
      const formData = new FormData();
      formData.append("invoice", pdfBlob, filename);
      formData.append("email", details.email || "");
      formData.append("businessName", details.businessName || "");
      formData.append("businessType", details.businessType || "");
      formData.append("ownerName", details.ownerName || "");
      formData.append("phone", details.phone || "");
      formData.append("address", details.address || "");
      formData.append("invoiceId", invoiceId);
      formData.append("orderId", details.orderId || "");
      formData.append("confirmationCode", confirmationCode);
      formData.append("amount", details.amount || "0");
      formData.append("plan", details.selectedPlan || "Dynamic");
      formData.append("billingCycle", details.billingCycle || "Monthly");
      formData.append("currency", details.currency || "LKR");

      axios
        .post(`https://caritasconnect.ddns.net/billtill/api/send-invoice`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => console.log("Invoice email sent successfully"))
        .catch((err) =>
          console.error(
            "Invoice email failed:",
            err?.response?.data || err.message,
          ),
        );
    }
  };
