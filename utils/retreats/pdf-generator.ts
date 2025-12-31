import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { jsPDFWithAutoTable } from "@/types";
import { ReportData } from "@/types/interface/report";

const generateRetreatPDF = async (reportData: ReportData) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    try {
        const logoImg = new Image();
        logoImg.src = "/limages/logo.png";
        await new Promise((resolve, reject) => {
            logoImg.onload = resolve;
            logoImg.onerror = reject;
        });
        doc.addImage(logoImg, "PNG", pageWidth / 2 - 15, yPosition, 30, 30);
        yPosition += 35;
    } catch (error) {
        console.error("Error loading logo:", error);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("DEEPER CHRISTIAN LIFE MINISTRY", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 6;
    doc.setFontSize(12);
    doc.text("WEST COAST REGION", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 6;
    doc.text("BRIKAMA TOWN, THE GAMBIA", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 8;
    doc.setFontSize(16);
    doc.text(
        `${reportData.retreat.year} ${reportData.retreat.type.toUpperCase()} RETREAT`,
        pageWidth / 2,
        yPosition,
        { align: "center" }
    );

    yPosition += 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("REGISTRATION SUMMARY", 14, yPosition);
    yPosition += 7;

    autoTable(doc, {
        startY: yPosition,
        head: [["Category", "Count", "Percentage"]],
        body: [
            ["Total Registrations", reportData.registrationSummary.total.toString(), "100%"],
            ["Male", reportData.registrationSummary.male.toString(), `${reportData.registrationSummary.malePercentage}%`],
            ["Female", reportData.registrationSummary.female.toString(), `${reportData.registrationSummary.femalePercentage}%`],
        ],
        theme: "grid",
        headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
    });

    yPosition = doc.lastAutoTable.finalY + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("REGISTRATION BY CATEGORY", 14, yPosition);
    yPosition += 7;

    autoTable(doc, {
        startY: yPosition,
        head: [["Category", "Count", "Percentage"]],
        body: reportData.categoryBreakdown.map(item => [
            item.category,
            item.count.toString(),
            `${item.percentage}%`,
        ]),
        theme: "grid",
        headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
    });

    yPosition = doc.lastAutoTable.finalY + 10;

    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("REGISTRATION BY NATIONALITY", 14, yPosition);
    yPosition += 7;

    autoTable(doc, {
        startY: yPosition,
        head: [["Nationality", "Count", "Percentage"]],
        body: reportData.nationalityBreakdown.map(item => [
            item.nationality,
            item.count.toString(),
            `${item.percentage}%`,
        ]),
        theme: "grid",
        headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
    });

    yPosition = doc.lastAutoTable.finalY + 10;

    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("REGISTRATION BY LOCATION", 14, yPosition);
    yPosition += 7;

    autoTable(doc, {
        startY: yPosition,
        head: [["Location", "Count", "Percentage"]],
        body: reportData.locationBreakdown.map(item => [
            item.location,
            item.count.toString(),
            `${item.percentage}%`,
        ]),
        theme: "grid",
        headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
    });

    yPosition = doc.lastAutoTable.finalY + 10;

    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("REGISTRATION BY TYPE", 14, yPosition);
    yPosition += 7;

    autoTable(doc, {
        startY: yPosition,
        head: [["Type", "Count", "Percentage"]],
        body: reportData.typeBreakdown.map(item => [
            item.type,
            item.count.toString(),
            `${item.percentage}%`,
        ]),
        theme: "grid",
        headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
    });

    yPosition = doc.lastAutoTable.finalY + 10;

    doc.addPage();
    yPosition = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("DAILY REGISTRATION ANALYSIS", 14, yPosition);
    yPosition += 7;

    autoTable(doc, {
        startY: yPosition,
        head: [["Day", "Adult", "Youth", "Campus", "Children", "Total"]],
        body: reportData.dailyRegistrations.map(item => [
            item.day.toString(),
            item.adult.toString(),
            item.youth.toString(),
            item.campus.toString(),
            item.children.toString(),
            item.total.toString(),
        ]),
        theme: "grid",
        headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
    });

    if (reportData.attendanceData && reportData.attendanceData.dailyAttendance.length > 0) {
        yPosition = doc.lastAutoTable.finalY + 10;

        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("DAILY ATTENDANCE ANALYSIS", 14, yPosition);
        yPosition += 7;

        autoTable(doc, {
            startY: yPosition,
            head: [["Day", "Date", "Adult", "Youth", "Campus", "Children", "Total"]],
            body: reportData.attendanceData.dailyAttendance.map(item => [
                item.day.toString(),
                item.date,
                item.adult.toString(),
                item.youth.toString(),
                item.campus.toString(),
                item.children.toString(),
                item.total.toString(),
            ]),
            theme: "grid",
            headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
            styles: { fontSize: 9 },
        });

        yPosition = doc.lastAutoTable.finalY + 10;

        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("AVERAGE ATTENDANCE", 14, yPosition);
        yPosition += 7;

        autoTable(doc, {
            startY: yPosition,
            head: [["Category", "Average Attendance"]],
            body: [
                ["Adult", reportData.attendanceData.averageAttendance.adult.toString()],
                ["Youth", reportData.attendanceData.averageAttendance.youth.toString()],
                ["Campus", reportData.attendanceData.averageAttendance.campus.toString()],
                ["Children", reportData.attendanceData.averageAttendance.children.toString()],
                ["Total", reportData.attendanceData.averageAttendance.total.toString()],
            ],
            theme: "grid",
            headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
            styles: { fontSize: 10 },
        });

        if (reportData.attendanceData.sessionDetails.length > 0) {
            const gsSessions = reportData.attendanceData.sessionDetails.filter(
                session => session.isGSMessage
            );

            if (gsSessions.length > 0) {
                doc.addPage();
                yPosition = 20;

                const gsCategories = ["Adult", "Campus", "Youth", "Children"];

                gsCategories.forEach((category, index) => {
                    const categorySessions = gsSessions.filter(
                        session => session.category === category
                    );

                    if (categorySessions.length === 0) return;

                    if (index > 0) {
                        yPosition = doc.lastAutoTable.finalY + 15;
                        if (yPosition > 240) {
                            doc.addPage();
                            yPosition = 20;
                        }
                    }

                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(12);
                    const categoryTitle = `${category.toUpperCase()} CHURCH - GS MESSAGE ATTENDANCE`;
                    doc.text(categoryTitle, 14, yPosition);
                    yPosition += 7;

                    autoTable(doc, {
                        startY: yPosition,
                        head: [["Day", "Session Name", "Time", "Male", "Female", "Total"]],
                        body: categorySessions.map(item => [
                            item.day.toString(),
                            item.sessionName,
                            item.sessionTime,
                            item.male.toString(),
                            item.female.toString(),
                            item.total.toString(),
                        ]),
                        theme: "grid",
                        headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
                        styles: { fontSize: 9 },
                    });

                    const categoryTotal = categorySessions.reduce((sum, session) => sum + session.total, 0);
                    yPosition = doc.lastAutoTable.finalY + 5;

                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(10);
                    doc.text(`${category} Church Total GS Attendance: ${categoryTotal}`, 14, yPosition);
                });
            }

            doc.addPage();
            yPosition = 20;

            const categories = ["Adult", "Campus", "Youth", "Children"];

            categories.forEach((category, index) => {
                const categorySessions = reportData.attendanceData!.sessionDetails.filter(
                    (session) => session.category === category
                );

                if (categorySessions.length === 0) return;

                if (index > 0) {
                    yPosition = doc.lastAutoTable.finalY + 15;
                    if (yPosition > 240) {
                        doc.addPage();
                        yPosition = 20;
                    }
                }

                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                const categoryTitle = `${category.toUpperCase()} CHURCH - SESSION ATTENDANCE`;
                doc.text(categoryTitle, 14, yPosition);
                yPosition += 7;

                autoTable(doc, {
                    startY: yPosition,
                    head: [["Day", "Session Name", "Time", "Male", "Female", "Total"]],
                    body: categorySessions.map(item => [
                        item.day.toString(),
                        item.sessionName,
                        item.sessionTime,
                        item.male.toString(),
                        item.female.toString(),
                        item.total.toString(),
                    ]),
                    theme: "grid",
                    headStyles: { fillColor: [29, 40, 97], textColor: 255, fontStyle: "bold" },
                    styles: { fontSize: 9 },
                });
            });
        }
    }

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(
            `Page ${i} of ${totalPages}`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: "center" }
        );
        doc.text(
            `Generated on ${new Date().toLocaleDateString()}`,
            pageWidth - 14,
            doc.internal.pageSize.getHeight() - 10,
            { align: "right" }
        );
    }

    const fileName = `${reportData.retreat.year}_${reportData.retreat.type}_Retreat_Report.pdf`;
    doc.save(fileName);
};

export default generateRetreatPDF;