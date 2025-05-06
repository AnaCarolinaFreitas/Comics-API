const PDFDocument = require("pdfkit");

const herosModel = require("../models/herosModel");


const exportHeroPDF = async (_, res) => {
    try {
        const heros = await herosModel.getHeros();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=heros.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Herois", { align: "center" });
        doc.moveDown(); 

        // Cabeçalho da Tabela
        const tableTop = 130; 
        const rowHeight = 30; 
        const columnWidths = [70, 200, 120, 120, 120]; 
        let y = tableTop;
        
        doc.fontSize(12).font("Helvetica-Bold");
        doc.text("ID", 50, y, { width: columnWidths[0], align: "left" });
        doc.text("Nome", 120, y, { width: columnWidths[1], align: "left" });
        doc.text("Publisher", 340, y, { width: columnWidths[3], align: "left" });
        
        // Dados da Tabela
        doc.font("Helvetica");
        y += rowHeight;
        heros.forEach((hero) => {
            doc.text(hero.id, 50, y, { width: columnWidths[0], align: "left" });
            doc.text(hero.name, 120, y, { width: columnWidths[1], align: "left" });
            doc.text(hero.publisher_name, 340, y, { width: columnWidths[3], align: "left" });
            y += rowHeight;
            
            doc.moveTo(50, y - 5).lineTo(560, y - 5).stroke();
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF" });
    }
};

module.exports = { exportHeroPDF };