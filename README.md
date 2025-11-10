# 🩸 Blood Connect - Backend

Backend service for **Blood Connect**, a platform that helps **hospitals connect with nearby blood donors** based on blood type and location.  
Built using **Node.js**, **Express**, **Prisma**, and **MongoDB**.

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/luiizhenrique1/be-blood-connect.git
   cd be-blood-connect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

---

## 🧠 Overview

This backend provides APIs for:
- Creating and managing users (donors or hospitals)  
- Handling authentication via JWT  
- Searching for blood donors by type and location  

---

## 🤝 Contributing

1. Fork the repository  
2. Create a branch (`feature/your-feature`)  
3. Commit your changes  
4. Open a pull request  

---

## 💡 Author

**Luiz Henrique Minozzo Alexandretti**  

