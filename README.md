# ✈️ Payment Microservice - TravelEase

This is the **Payment microservice** for the [TravelEase](https://github.com/TravelEase-Xebia/TravelEase) platform
It allows users to **Pay for their flight tickets**, and then redirects them back to **Booking page** for booking additional tickets.

---

## 📦 Features

- Choose **Number of seats**
- Save payment details to a **MongoDB Atlas database**.
- Redirect to **Booking Microservice** after successful booking (integration-ready)...

---

## 📝 Environment Variables

Create a `.env` file in the root of the service directory:
```
PORT=5070
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>
```
---

## 📡 API Endpoints

| Method | Endpoint        | Description                  |
|:--------|:----------------|:------------------------------|
| `POST`  | `/api/payment` | Add a new booking (JSON body)  |

**Sample JSON body for payment:**
```json
{
  "departure": "Delhi",
  "destination": "Mumbai",
  "date": "2025-06-30",
  "flight": "Indigo",
  "tickets": "3",
  "total": "13500"
}
```
## 🚀 Running the Service
1️⃣ Install dependencies
```
npm install
```
2️⃣ Start service locally
```
node server.js
```
The service will be running at:
```
http://localhost:port_number/
```
## 🐳 Run with Docker Compose
If you're using Docker Compose for orchestrating multiple services.:
```
docker compose up -d
```
