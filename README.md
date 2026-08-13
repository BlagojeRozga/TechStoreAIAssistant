# TechStore AI Assistant

AI asistent za TechStore prodavnicu koji koristi RAG (Retrieval-Augmented Generation) pristup za odgovaranje na pitanja o proizvodima.

## 🚀 Funkcionalnosti

- 🔎 Semantic vector search
- 🧠 RAG pristup
- 📊 Result reranking
- 💬 Conversation memory
- 🏷️ Detekcija proizvoda
- 🎯 Detekcija kategorije i intent-a
- 🔄 Query rewriting
- 🛡️ Confidence checking
- 🤖 OpenAI integracija
- ↩️ Fallback odgovor iz baze znanja kada OpenAI API nije dostupan
- 🧪 Automatizovani chat testovi
- 🌐 REST API preko Express-a

## 🏗️ AI Pipeline

Korisničko pitanje prolazi kroz više faza:

```text
User Query
    ↓
Normalize
    ↓
Intent Detection
    ↓
Product Detection
    ↓
Conversation Memory
    ↓
Query Rewrite
    ↓
Category Detection
    ↓
Vector Search
    ↓
Reranking
    ↓
Confidence Check
    ↓
Answer Generation
    ↓
Response