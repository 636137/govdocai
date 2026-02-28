# GovDocAI

**Intelligent Document Processing Pipeline for Government**

## Background
NARA is leveraging Amazon Textract for intelligent document processing across 390M digital catalog objects, targeting 500M digitized pages by October 2026. BCG estimates AI-powered case processing can yield up to 35% budget savings over ten years. Executive Order mandates cessation of paper checks by September 30, 2025. Paper infrastructure cost taxpayers over $657M in FY2024.

## Need
Agencies process millions of paper forms annually, each building bespoke solutions. No reusable open-source IDP pipeline exists handling ingestion through classification, extraction, validation, and integration.

## Solution
Modular document processing pipeline: scanned documents/PDFs → classification → OCR/NLP extraction → validation → API output to agency systems.

## Design
**Pipeline Stages:**
1. Ingestion (multi-format, de-duplication)
2. Classification (ML document type ID)
3. Extraction (OCR + NLP entities, confidence scoring)
4. Validation (business rules, human review queues)
5. Integration (API output to databases/workflows)

**Tech Stack:** Python, Tesseract OCR, spaCy NLP, FastAPI, PostgreSQL, AWS Textract/Azure Form Recognizer

## Outcomes
- 60-80% processing time reduction
- Up to 35% budget savings (BCG estimate)
- Eliminate $657M paper infrastructure cost

**Quick Start:**
```bash
git clone https://github.com/636137/govdocai.git
cd govdocai && pip install -r requirements.txt
python -m govdocai process --input docs/ --output results/
```

---
**Status**: Active Development | **Last Updated**: 2026-02-28
