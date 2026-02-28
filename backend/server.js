const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());
app.use(express.json());

const documents = [];
let docId = 1;

// Extract text from document (simulated)
function extractText(filename) {
  const templates = {
    'passport': 'PASSPORT\nName: John Doe\nPassport No: 123456789\nIssue Date: 01/15/2020\nExpiry: 01/15/2030',
    'tax': 'FORM 1040\nTax Year: 2025\nName: Jane Smith\nSSN: XXX-XX-1234\nTotal Income: $75,000',
    'license': 'DRIVER LICENSE\nName: Bob Johnson\nLicense No: D1234567\nExpiry: 12/31/2026'
  };
  
  for (const [type, text] of Object.entries(templates)) {
    if (filename.toLowerCase().includes(type)) return text;
  }
  return 'Sample document text extracted';
}

// Classify document type
function classifyDocument(text) {
  if (text.includes('PASSPORT')) return 'passport';
  if (text.includes('FORM 1040') || text.includes('TAX')) return 'tax_form';
  if (text.includes('DRIVER LICENSE')) return 'drivers_license';
  if (text.includes('BIRTH CERTIFICATE')) return 'birth_certificate';
  return 'other';
}

// Extract key fields
function extractFields(text, type) {
  const fields = {};
  
  if (type === 'passport') {
    const nameMatch = text.match(/Name:\s*(.+)/);
    const numberMatch = text.match(/Passport No:\s*(.+)/);
    if (nameMatch) fields.name = nameMatch[1].trim();
    if (numberMatch) fields.passportNumber = numberMatch[1].trim();
  }
  
  if (type === 'tax_form') {
    const ssnMatch = text.match(/SSN:\s*(.+)/);
    const incomeMatch = text.match(/Total Income:\s*(.+)/);
    if (ssnMatch) fields.ssn = ssnMatch[1].trim();
    if (incomeMatch) fields.income = incomeMatch[1].trim();
  }
  
  return fields;
}

app.post('/api/upload', upload.single('document'), (req, res) => {
  const file = req.file;
  const text = extractText(file.originalname);
  const type = classifyDocument(text);
  const fields = extractFields(text, type);
  
  const doc = {
    id: docId++,
    filename: file.originalname,
    type,
    text,
    fields,
    uploadedAt: new Date()
  };
  
  documents.push(doc);
  res.json(doc);
});

app.get('/api/documents', (req, res) => {
  res.json(documents);
});

const PORT = 3007;
app.listen(PORT, () => console.log(`GovDocAI API on port ${PORT}`));
